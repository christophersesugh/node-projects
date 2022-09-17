import dotenv from "dotenv";
import connectDB from "./database/index.js";
import Product from "./models/product.js";
import productsJson from "./products.json" assert { type: "json" };

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const start = async () => {
  await connectDB(MONGO_URI, () => {
    console.log(`Connected to DB`);
  });
  await Product.deleteMany();
  await Product.create(productsJson);
  process.exit(0);
};
start();
