import { navigate } from "@navigation/NavigationUtil";
import { BASE_URL } from "@store/config"
import axios from "axios"
import RazorpayCheckout from 'react-native-razorpay';

export const createTransaction = async (amount: number, userId: string) => {
    try {
        const res = await axios.post(`${BASE_URL}/order/transaction`, {
            userId,
            amount: amount * 100
        })
        return res.data
    } catch (error) {
        return null
    }
}

export const createOrder = async (
    key: string,
    amount: number,
    order_id: string,
    cart: any,
    userId: string,
    address: string
) => {
    try {
        const options = {
            description: "Ecommerce Shopping",
            image: "https://razorpay.com/assets/razorpay-logo-blue.png",
            currency: "INR",
            key: key,
            amount: amount,
            name: "Kart",
            order_id: order_id,
            theme: {
                color: "#53a20e",
            }
        }

        RazorpayCheckout.open(options).then(async (data) => {
            console.log("📌 Razorpay Payment Success:", data);
            console.log("🛒 CART SENDING:", cart);

            const today = new Date();
            const sevenDaysFromNow = new Date();
            sevenDaysFromNow.setDate(today.getDate() + 7)

            const res = await axios.post(`${BASE_URL}/order`, {
                razorpay_order_id: order_id,
                razorpay_payment_id: data?.razorpay_payment_id,
                razorpay_signature: data?.razorpay_signature,
                userId: userId,
                cartItems: cart.map((item: any) => ({
                    _id: item._id,
                    quantity: item.quantity
                })),

                deliveryDate: sevenDaysFromNow.toISOString(),
                address: address,
            })
            navigate("PaymentSuccess", {
                price: amount / 100,
                address: address
            })

        }).catch((err: any) => {
            console.log(err)
            return { type: 'error', message: err?.description }
        })

    } catch (error) {
        console.log("Error creating order:", error);
        return { type: 'error', message: "Error" }
    }
}