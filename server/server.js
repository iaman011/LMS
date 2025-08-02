import app from './app.js';
import { config } from 'dotenv';
import connectToDB from './config/db.js';
import cloudinary from 'cloudinary';
import Razorpay from 'razorpay';

config();



// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY,
})

// Razorpay configuration
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const PORT = process.env.PORT || 5011;

app.listen(PORT, () => {
  connectToDB();
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
