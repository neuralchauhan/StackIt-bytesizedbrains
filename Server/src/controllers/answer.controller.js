import { asyncHandler } from "../lib/asyncHandler.js"
import { ApiError } from "../lib/ApiError.js"
import { ApiResponse } from "../lib/ApiResponse.js"
import { Question } from "../models/question.model.js"
import { Answer } from "../models/answer.model.js"
import { Notification } from "../models/notification.model.js"

export const postAnswer = asyncHandler( async( req, res ) => {

  try {
    const io = req.app.get("io");
    const questionId = req.params?.id
    if(!questionId){
      throw new ApiError(400, "Question not found")
    }
    const question = await Question.findById(questionId).populate("author")
    if(!question) {
      throw new ApiError(400, "Question not found")
    }
    const { content } = req.body
  
    const answer = await Answer.create({
      question : question._id,
      content : content ,
      author : req.user.id
    })
  
    await answer.save()
  
    if( question && question.author?._id.toString() != req.user.id ){
  
      const notification = await Notification.create({
        sender : req.user.id,
        recipient : question.author._id,
        type : "answer",
        message : `${req.user.username} answered your question`,
        link : `/questions/${questionId}`
      })
  
      await notification.save()
  
      io.emit(`notify:${question.author._id}`, {
        message : notification.message,
        link : notification.link,
        type : notification.type,
        time : notification.createdAt
      })
  
      return res
              .status(200)
              .json(new ApiResponse(200, "Notification send successfully", notification))
    }
  } catch (error) {
      throw new ApiError(500, error.message )
  }
})

export const upvoteAnswer = asyncHandler( async( req, res ) => {
  try {
    
    const  answerId  = req.params?.id
    const answer = await Answer.findById(answerId)
    if(!answer) {
      throw new ApiError(400, "Answer not found")
    }
  
    const userId = req.user?.id
    if(!userId) {
      throw new ApiError(400, "Unauthorized request")
    }
  
    if( answer.upvotes.includes(userId) ){
        answer.upvotes.pull(userId)
    }else{
      answer.upvotes.push(userId)
    }
  
    await answer.save();
  
    return res
            .status(200)
            .json(new ApiResponse(200, "upvote or downvote successfully", {}))
  } catch (error) {
    throw new ApiError(500, error.message )
  }
})

export const commentOnAnswer = asyncHandler( async( req, res ) => {
  
 try {
   const  answerId  = req.params?.id
   const { content } = req.body

   const answer = await Answer.findById(answerId)
   if(!answer){
    throw new ApiError(400, "Answer not found")
   }

   answer.comments.push({
    author : req.user.id,
    content : content
   })

   await answer.save()
   return res
            .status(200)
            .json( new ApiResponse(200, "Commented on the answer successfully"))
 } catch (error) {
    throw new ApiError(500, error.message)
 }
})