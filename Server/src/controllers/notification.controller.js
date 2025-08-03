import { asyncHandler } from "../lib/asyncHandler.js";
import { Notification } from "../models/notification.model.js";
import { ApiError } from "../lib/ApiError.js";
import { ApiResponse } from "../lib/ApiResponse.js"

export const getNotification = asyncHandler( async( req, res ) => {
  try {
      const notification = await Notification.findOne({ recipient : req.user?.id }).sort({ createdAt : -1 })
      return res
              .status(200)
              .json( new ApiResponse(200, "Notifications fetched successfully", notification))
  } catch (error) {
    throw new ApiError(500, error.message )
  }
})