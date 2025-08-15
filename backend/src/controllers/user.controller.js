import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const registerUser = AsyncHandler(async (req, res) => {
  const { name, userName, email, password } = req.body;
  if (!name || !userName || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const existingUser = await User.findOne({ userName });
  if (existingUser) {
    throw new ApiError(401, "User already exists");
  }
  const refreshToken = jwt.sign(
    { userName },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "30d" }
  );
  const accessToken = jwt.sign(
    { userName, name, email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  const user = await User.create({
    name,
    userName,
    email,
    password,
    refreshToken,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  res.json(
    new ApiResponse(201, "User created successfully", {
      user: createdUser,
      accessToken,
      refreshToken,
    })
  );
});
export { registerUser };
