import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

const userRouter = router.post("/register", registerUser);

export default router;
