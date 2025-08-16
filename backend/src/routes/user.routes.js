import { Router } from "express";
import { registerUser,loginUser } from "../controllers/user.controller.js";
import { createProduct,updateProduct,deleteProduct } from "../controllers/product.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/", verifyToken, createProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

export default router;