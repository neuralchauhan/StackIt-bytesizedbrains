import { Question } from "../models/question.model.js";
import { Answer } from "../models/answer.model.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { ApiError } from "../lib/ApiError.js";
import { ApiResponse } from "../lib/ApiResponse.js";
import mongoose from "mongoose";

export const getAllQuestions = asyncHandler(async (req, res) => {
  try {
    const questions = await Question.find({})
      .populate("author", "username")
      .sort({ createdAt: -1 });


    const data = await Promise.all(
      questions.map( async(question) => {
        const answers = await Answer.find({ question : question._id})
                            .populate("author", "username")
                            .sort({ createdAt : -1 })

        return {
          ...question._doc,
          upvotes: question.upvotes?.length || 0,
          answers,
        }
      })
    )

    return  res
              .status(200)
              .json(new ApiResponse(200, "All questions fetched successfully", data))
    
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export const createQuestion = asyncHandler( async(req, res ) => {
 try {
   const { title, description, tags } = req.body
 
   if( !title || !description || !tags ) {
     throw new ApiError(400, "All fields are required")
   }
 
   const question = await Question.create({
     title,
     description,
     tags,
     author : req.user?.id
   })
 
   const createdQuestion = await question.save();
 
   return res  
           .status(200)
           .json(new ApiResponse(200, "Question created successfully", createQuestion))
 } catch (error) {
    throw new ApiError(500, error.message )
 }
})


export const upvoteQuestion = asyncHandler( async( req, res ) => {
  
  try {
    // const q_id = new mongoose.Types.ObjectId()
    const question = await Question.findById(req.params?.id)
    if(!question) { 
      throw new ApiError(400, "Question not found")
    }
  
    const userId = await req.user?.id;
  
    if(question.upvotes?.includes(userId)){
      question.upvotes?.pull(userId)
    }
    else{
      question.upvotes?.push(userId)
    }
  
    await question.save()
  
    return res
            .status(200)
            .json(new ApiResponse(200, "Upvoted successfully", {}))
  } catch (error) {
      throw new ApiError(500, error.message)
  }
})