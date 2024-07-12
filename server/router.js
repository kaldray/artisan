import express from "express";
import {
  getProducts,
  getProduct,
  updateProduct,
  createProduct,
  deleteProduct,
} from "./products/controller.js";

export const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.post("/products", createProduct);
