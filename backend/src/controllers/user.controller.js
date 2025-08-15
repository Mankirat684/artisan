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

const loginUser = AsyncHandler(async (req, res) => {
  //take input and validate
  //find the user with username
  //check the password
  //generate tokens
  //send user data with access token and refresh token

  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await User.findOne({ userName });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid Password");
  }
  const refreshToken = user.generateRefreshToken();
  const accessToken = user.generateAccessToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, "Login successful", {
        user: loggedInUser,
        accessToken,
      })
    );
});
export { registerUser, loginUser };
