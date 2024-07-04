const express = require("express");

const port = process.env.PORT || 8080;
const app = express();

app.listen(port, () => {
  console.log(port + " 서버 실행중...");
});
