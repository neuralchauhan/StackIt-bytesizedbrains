import express from "express";
const router = express.Router();

import { verifyJWT } from "../middlewares/auth.middleware.js"
import { getAllQuestions, createQuestion, upvoteQuestion } from "../controllers/question.controller.js";

router
  .route("/get-all-questions")
  .get(getAllQuestions)

router
  .route("/new-question")
  .post(verifyJWT, createQuestion)

router
  .route("/:id/upvote")
  .put(verifyJWT, upvoteQuestion )
export default router;
