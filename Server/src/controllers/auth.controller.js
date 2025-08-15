import { User } from "../models/user.model.js";
import { ApiError } from "../lib/ApiError.js";
import { ApiResponse } from "../lib/ApiResponse.js";
import { asyncHandler } from "../lib/asyncHandler.js";

const options = {
  httpOnly : true,
  secure : true,
  sameSite: "None",
}

const generateAccessToken = async(userId) => {

  try {
    if(!userId){
      throw new ApiError(404, "userId does not exists")
    }

    const user = await User.findById(userId).select("-password")
    const accessToken = await user.generateAccessToken(userId)

    return accessToken;

  } catch (error) {
    throw new ApiError(500, error.message)
  }
}

export const signup = asyncHandler ( async (req, res) => {

  const { fullname, username, email, password } = req.body;
  try {
    if (!fullname || !email || !password || !username ) {
      throw new ApiError(400, "All fields are required")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ApiError(400, "Invalid email format")
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ApiError(401, "email already registered")
    }

    const newUser = await User.create({
      fullname,
      username,
      email,
      password
    });

    const accessToken = await generateAccessToken(newUser._id);

    return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .json(new ApiResponse(200, "User registered successfully", newUser));

  } catch (error) {
    throw new ApiError(500, error)
  }
})

export const signin = asyncHandler (async (req, res) => {

  const { email, password } = req.body;
  try {
    if (!email?.trim() || !password) {
      throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({ email })

    if (!existingUser) {
     throw new ApiError(400, "User does not exists")
    }

    const isPasswordValid = existingUser.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid credentials")
    }

   const accessToken = await generateAccessToken(existingUser._id);
    
   return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .json( new ApiResponse(200, "User logged in successfully", existingUser))
  } catch (error) {
    throw new ApiError(500, error.message)
  }
})

export const signout = async (req, res) => {

  const user = req.user

  if(!user) {
    throw new ApiError(400, "Unauthorized request")
  }

  return res
          .status(200)
          .clearCookie("accessToken", options)
          .json( new ApiResponse(200, "User logged out successfully"))
}
