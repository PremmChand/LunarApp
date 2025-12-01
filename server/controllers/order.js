import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/order.js";
import Transaction from "../models/transaction.js";
import Product from "../models/product.js";


const createTransaction = async (req, res) => {
    const { amount, userId } = req.body;

    const razorpay = new Razorpay({
        key_id: process.env.RAZOR_PAY_KEY_ID,
        key_secret: process.env.RAZOR_PAY_SECRET,
    });

    const options = {
        amount: amount,
        currency: "INR",
        receipt: `receippt#${Date.now()}`
    }
    try {

        if (!amount || !userId) {
            return res.status(400).json({
                success: false,
                message: "Amount and user id is required"
            })
        }

        const razoorpayOrder = await razorpay.orders.create(options)
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            key: process.env.RAZOR_PAY_KEY_ID,
            // amount: razoorpayOrder.currency,
            amount: razoorpayOrder.amount,   // ✅ FIXED
            currency: razoorpayOrder.currency, // ✅ FIXED
            order_id: razoorpayOrder.id,
        })
    } catch (error) {
        console.log("RAZORPAY ERROR:", error); // <--- ADD THIS
        res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: error.message,
        });
    }
};


const createOrder = async (req, res) => {
    console.log("🔵 createOrder API HIT");
    console.log("BODY RECEIVED:", req.body);

    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        userId,
        cartItems,
        deliveryDate,
        address,
    } = req.body;

    const key_secret = process.env.RAZOR_PAY_SECRET;

    // Generate signature for verification
    const generated_signature = crypto
        .createHmac("sha256", key_secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

    if (generated_signature !== razorpay_signature) {
        console.log("❌ Signature mismatch!");
        return res.status(400).json({
            success: false,
            message: "Signature verification failed",
        });
    }

    try {
        // ✔ Calculate totalAmount using DB price
        let totalAmount = 0;

        for (const cartItem of cartItems) {
            const product = await Product.findById(cartItem._id);
            if (product) {
                totalAmount += product.price * cartItem.quantity;
            }
        }

        // ✔ Create Transaction entry
        const transaction = await Transaction.create({
            user: userId,
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            status: "Success",
            amount: totalAmount,
        });

        // ✔ Create Order entry
        const order = await Order.create({
            user: userId,
            address,
            deliveryDate,
            items: cartItems.map((item) => ({
                Product: item._id,
                quantity: item.quantity,
            })),
            status: "Order Placed",
        });

        // ✔ Link Order to Transaction
        transaction.order = order._id;
        await transaction.save();

        return res.json({
            success: true,
            message: "Payment Verified and order created",
            order,
        });

    } catch (error) {
        console.error("🔥 ERROR:", error);
        return res.status(500).json({
            status: "failed",
            message: "Failed to create transaction or order",
            error,
        });
    }
};

const getOrdersByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ user: userId })
            .populate("user", "name email")
            .populate("items.Product", "name price image_uri ar_uri")
            .sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            // Return empty array with success
            return res.status(200).json({
                success: true,
                orders: [],
                message: "No orders found for this user",
            });
        }

        return res.status(200).json({
            success: true,
            orders,
        });

    } catch (error) {
        console.error("🔥 ERROR in getOrdersByUserId:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve orders",
            error: error.message,
        });
    }
};


export { createTransaction, createOrder, getOrdersByUserId }