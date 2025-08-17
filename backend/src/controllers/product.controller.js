import { ApiError } from "../utils/ApiError.js";
import Product from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const createProduct = AsyncHandler(async (req, res) => {
  const {
    title,
    description,
    images,
    price,
    quantity,
    category,
    isPublished,
    aiGenerated,
  } = req.body;

  const owner = req.user._id;

  if (!title || !description || !images || !price || !quantity || !category) {
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

let updateProduct = AsyncHandler(async (req, res) => {
  //check if product exists
  //take new values
  //resave the product with new values

  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  
  if (product.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this product");
  }


  const {
    title,
    description,
    images,
    price,
    quantity,
    category,
    isPublished,
    aiGenerated,
  } = req.body;

  if (!title && !description && !images && price === undefined && quantity === undefined
    && !category && typeof isPublished !== "boolean" && typeof aiGenerated !== "boolean") {
  throw new ApiError(400, "No valid fields provided for update");
}


  if (title) product.title = title;
  if (description) product.description = description;
  if (images) product.images = images;
  if (price !== undefined) {
    if (price < 0) throw new ApiError(400, "Price cannot be negative");
    product.price = price;
  }
  if (quantity !== undefined) {
    if (quantity < 0) throw new ApiError(400, "Quantity cannot be negative");
    product.quantity = quantity;
  }
  if (category) product.category = category;
  if (typeof isPublished === "boolean") product.isPublished = isPublished;
  if (typeof aiGenerated === "boolean") product.aiGenerated = aiGenerated;

  await product.save();

  res.json(new ApiResponse(200, "Product updated successfully", product));
});

const deleteProduct = AsyncHandler(async (req,res)=>{
  //check if product exist
  //verify product owner 
  //remove that product from database

  const product = await Product.findById(req.params.id);
  if(!product){
    throw new ApiError(404, "Product not found");
  };

  if (product.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this product");
  }

  await product.deleteOne();

  res.json(new ApiResponse(200, "Product deleted successfully"));
})

const getAllProducts = AsyncHandler(async (req,res)=>{
  //check user is logged in
  //show user's products

  if(!req.user){
    throw new ApiError(401, "You must be logged in to view products");
  }

  const products = await Product.find({owner: req.user._id});
  res
  .json(new ApiResponse(200, "Products fetched successfully", products));
})

const getProductById = AsyncHandler(async (req, res) => {
  //check if product exists
  //check if product owner is user himself
  //send product details
  const product = await Product.findById(req.params.id);
  if(!product){
    throw new ApiError(404, "Product not found");
  }
  if (product.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to view this product");
  }
  res.json(new ApiResponse(200, "Product fetched successfully", product));
})
export { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById };
