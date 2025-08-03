import express from "express";
const router = express.Router();

import { verifyJWT } from "../middlewares/auth.middleware.js"
import { commentOnAnswer, postAnswer, upvoteAnswer } from "../controllers/answer.controller.js";

router
  .route("/:id/postAnswer")
  .post(verifyJWT, postAnswer)

router
  .route("/:id/upvote")
  .put(verifyJWT, upvoteAnswer)

router
  .route("/:id/comment")
  .put(verifyJWT, commentOnAnswer)

export default router