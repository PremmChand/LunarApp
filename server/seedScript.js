import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/product.js";
import Category from "./models/category.js";
import { categoriesData, productData } from "./seedData.js";
import { MONGO_URI } from "./config/config.js";

dotenv.config()

async function seedDatabase() {
    try {
        await mongoose.connect(MONGO_URI)

        await Product.deleteMany({})
        await Category.deleteMany({})

        const categoryDocs = await Category.insertMany(categoriesData)

        const categoryMap = categoryDocs.reduce((map, category) =>{
            map[category.name] = category._id;
            return map
        })

        const productWithCategoryIds = productData.map((product)=>({
            ...product,
            category: categoryMap[product.category],
        }))

        await Product.insertMany(productWithCategoryIds);
        
        console.log("DATABASE SEEDED SUCCESSFULY")

    } catch (error) {
            console.log("Error Seeding database:", error);
    } finally{
        mongoose.connection.close();
    }
}

seedDatabase();