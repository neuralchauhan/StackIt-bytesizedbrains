import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
    content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  upvotes : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User"
    }
  ],
    comments: [{
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  }],
}, {
  timestamps : true
});

export const Answer = mongoose.model("Answer", answerSchema);

