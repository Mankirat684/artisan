import { Router } from "express";
import { createProduct,updateProduct,deleteProduct,getAllProducts,getProductById } from "../controllers/product.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyToken, createProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);
router.get("/", verifyToken, getAllProducts);
router.get("/:id", verifyToken, getProductById);

export default router;