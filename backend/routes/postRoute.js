import express from "express";
import {question} from "../controllers/postController.js"
import {answer} from "../controllers/postController.js"
import {comment} from "../controllers/postController.js"
const router = express.Router();

// router.get("/", showQuestions)
router.post("/question", question);
router.post("/answer", answer);
router.post("/comment", comment);

export default router;