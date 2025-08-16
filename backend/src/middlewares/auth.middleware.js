import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import AsyncHandler from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

const verifyToken = AsyncHandler(async (req,res,next)=>{
   const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "");
   if (!token) {
    throw new ApiError(401, "unauthorized User");
   }
   try{
    const payload = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    if (!payload) {
      throw new ApiError(401, "invalid Accesstoken");
    }
    const user = await User.findById(payload._id);
    if (!user) {
      throw new ApiError(401, "invalid Accesstoken ");
    }
    req.user = user;
    next();
   }catch(error){
    throw new ApiError(401, "invalid Accesstoken");
   }

})
export { verifyToken };