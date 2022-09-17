import express from "express";
import {
  getAllProducts,
  getAllProductsStatic,
} from "../controllers/products.js";
const router = express.Router();

router.get("/static", getAllProductsStatic);
router.get("/", getAllProducts);

export default router;
