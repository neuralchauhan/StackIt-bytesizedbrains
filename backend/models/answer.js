import mongoose, { mongo } from "mongoose";

const answerSchema = new mongoose.Schema({
  question_id : { type : mongoose.Schema.Types.ObjectId, ref : "Question"},
  answer: { type: String },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: { type: Object },
  comment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Comments" },
});

const Answer = new mongoose.model("Answer", answerSchema);
export default Answer;