import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import teamRouter from "./routes/team.route.js";
import mercenaryRouter from "./routes/mercenary.route.js";
import dotenv from "dotenv";


dotenv.config();
const app = express();

const port = process.env.PORT || 8080;
const uri = process.env.DB;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose
  .connect(uri)
  .then(() => {
    console.log("데이터베이스 연결 완료!");
  })
  .catch((error) => {
    console.error("데이터베이스 연결 실패:", error);
  });

app.listen(port, () => {
  console.log(`${port} 서버 실행중...`);
});

app.use("/", authRouter);
app.use("/", teamRouter);
app.use("/", mercenaryRouter);

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "서버 에러!";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
