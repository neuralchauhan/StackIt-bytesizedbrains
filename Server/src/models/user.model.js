import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
     email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password : {
      type : String,
      required : true,
      minlength : 6
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function(password) {
  return bcrypt.compare(this.password, password);
};

userSchema.methods.generateAccessToken = async function(userId){
  return jwt.sign({ id : userId}, process.env.ACCESS_TOKEN_SECRET, { expiresIn : "1d"})
}

export const User =  mongoose.model("User", userSchema);
