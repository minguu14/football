const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user.route.js");
const registerRoutes = require("./routes/auth.route.js");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 8080;
const uri = process.env.DB;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(uri).then(() => {
  console.log("데이터베이스 연결 완료!");
});

app.listen(port, () => {
  console.log(port + " 서버 실행중...");
});

app.use("/", userRoutes);
app.use("/", registerRoutes);
app.use((err, req, res, next) => {
  const statusCode = err.message || 500;
  const message = err.message || "서버 에러!";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
