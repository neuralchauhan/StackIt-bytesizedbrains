import jwt from 'jsonwebtoken';
import { User }  from '../models/user.model.js';
import { asyncHandler } from "../lib/asyncHandler.js";
import { ApiError } from "../lib/ApiError.js";
import { compareSync } from 'bcryptjs';

export const verifyJWT = asyncHandler( async( req, _ , next ) => {

  try {
    const token = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
    if(!token){
      throw new ApiError(400, "Access token is missing")
    }
  
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if(!decodedToken) {
      throw new ApiError(401, "Unauthorized request")
    }

    const user = await User.findById(decodedToken.id).select("-password")
  
    if(!user){
      throw new ApiError(404, "User not found")
    }
  
    req.user = user;
    next()
  } catch (error) {
    throw new ApiError(500, error.message )
  }
})