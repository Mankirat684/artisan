import express from "express";
import upload from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";
import { spawn } from "child_process";
import fs from "fs";

const router = express.Router();

router.post("/upload");

export default router;
