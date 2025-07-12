import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: { type: String },
  body: { type: String },
  tags: [],
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: { type: Object },
  comment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Comments" },
});

const Question = new mongoose.model("Question", questionSchema);
export default Question;