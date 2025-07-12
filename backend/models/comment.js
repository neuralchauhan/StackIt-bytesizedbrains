import mongoose, { mongo } from "mongoose";

const commentSchema = new mongoose.Schema({
  question_id : { type : mongoose.Schema.Types.ObjectId, ref : "Question"},
  comment : { type: String },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: { type: Object },
});

const Comment = new mongoose.model("Comment", commentSchema);
export default Comment;