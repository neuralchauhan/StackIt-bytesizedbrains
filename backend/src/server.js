import express from "express";
import "dotenv/config";
import {connectDB} from "../lib/db.js";
import cors from "cors";
import userRoutes from "../routes/authRoute.js";
import postRoutes from "../routes/postRoute.js";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;

app.use(express.json({limit : "50mb", extended : true}));
app.use(express.urlencoded({limit : "50mb", extended : true}));
app.use(cors({
  origin : "http://localhost:5173",
  credentials : true,
}));
app.use(cookieParser());

app.use('/user', userRoutes);
app.use('/post', postRoutes);

app.listen(PORT, () => {
  console.log(`Server : http://localhost:${PORT}`);
  connectDB();
})