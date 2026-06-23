import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUD_NAME;
const apiKey = process.env.CLOUD_API_KEY;
const apiSecret = process.env.CLOUD_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
    console.error("❌ ERROR: Cloudinary environment variables are missing! Please check CLOUD_NAME, CLOUD_API_KEY, and CLOUD_API_SECRET in your .env file or hosting provider.");
}

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
});

export default cloudinary;