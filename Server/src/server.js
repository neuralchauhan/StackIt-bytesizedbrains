import "dotenv/config"
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import express from "express";
const app = express();

// setup of socket.io for real time notification
import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // or your frontend domain
    credentials: true
  }
});
app.set('io', io);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
});

app.use(express.json({limit : "50mb", extended : true}));
app.use(express.urlencoded({limit : "50mb", extended : true}));
app.use(cors({
  origin : "http://localhost:5173",
  credentials : true,
}));
app.use(cookieParser());

app.listen(process.env.PORT || 3000 , () => {
  console.log(`Server : http://localhost:`+process.env.PORT);
  connectDB();
})


// import routes
import userRouter from "./routes/auth.route.js";
import questionRouter from "./routes/question.route.js"
import answerRouter from "./routes/answer.route.js"
import notificationRouter from "./routes/notification.route.js"

app.use('/api/v1/users', userRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/answers", answerRouter)
app.use("/api/v1/notifications", notificationRouter )

export { app, server }