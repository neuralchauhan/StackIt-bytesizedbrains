import Question from "../models/question.js";
import Answer from "../models/answer.js";
import Comment from "../models/comment.js";

export const question = async (req, res) => {
  const { title, body, tags, user } = req.body;

  try {
    const questionData = new Question({ title, body, tags, user });
    await questionData.save();
    res.status(200).json({ success: true, message: questionData });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const answer = async (req, res) => {
  const { question_id, answer, user } = req.body;

  try {
    const answerData = new Answer({ question_id, answer, user });
    await answerData.save();

    res.status(200).json({ success: true, message: answerData });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const comment = async (req, res) => {
  const { question_id, comment , user } = req.body;

  try {
    const commentData = new Comment({ question_id, comment , user });
    await commentData.save();

    res.status(200).json({ success: true, message: commentData });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
