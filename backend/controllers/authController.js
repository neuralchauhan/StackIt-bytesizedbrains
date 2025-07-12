import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import user from "../models/user.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required!" });
    }

    if (password.length < 6) {
      return res.json({ message: "Password must be atleast 6 characters!" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "email already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({ success: true, message: "User signed up successfully!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required!" });
    }

    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return res.json({
        success: false,
        message: "Incorrect email or password!",
      });
    }

    const isMatching = await bcrypt.compare(password, existingUser.password);

    if (!isMatching) {
      return res.json({
        success: false,
        message: "Incorrect email or password!",
      });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({ success : true, message : "User Signed in succesfully!"});
  } catch (error) {
    return res.json({ success : false, message : error.message });
  }
};

export const signout = async (req, res) => {
  res.clearCookie("token");
  res
    .status(200)
    .json({ success: true, message: "User signed out successfully!" });
};
