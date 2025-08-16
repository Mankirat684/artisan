import { Router } from "express";
import { registerUser,loginUser } from "../controllers/user.controller.js";
import { createProduct,updateProduct,deleteProduct } from "../controllers/product.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/product", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
