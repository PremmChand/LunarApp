import dotenv from 'dotenv';
dotenv.config(); // Must be at top

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI;
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD;
export const RAZOR_PAY_KEY_ID = process.env.RAZOR_PAY_KEY_ID;
export const RAZOR_PAY_SECRET = process.env.RAZOR_PAY_SECRET;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
