import { ApiError } from "../utils/ApiError";
import Product from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse";
import AsyncHandler from "../utils/AsyncHandler";

const createProduct = AsyncHandler(async (req, res) => {
  const {
    title,
    description,
    images,
    owner,
    price,
    quantity,
    category,
    isPublished,
    aiGenerated,
  } = req.body;

  if (!title || !description || !images || !owner || !price || !quantity || !category) {
    throw new ApiError(400, "All fields are required");
  }

  if (price < 0) throw new ApiError(400, "Price cannot be negative");
  if (quantity < 0) throw new ApiError(400, "Quantity cannot be negative");

  const product = await Product.create({
    title,
    description,
    images,
    category,
    owner,
    price,
    quantity,
    isPublished,
    aiGenerated,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Product created successfully", product));
});



export { createProduct };
