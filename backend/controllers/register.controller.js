const UserModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");

const register = async (req, res, next) => {
  const { email, password, confirm_password, gender, name, birthday } = req.body;

  if (
    !email ||
    !password ||
    !gender ||
    !name ||
    !email ||
    !birthday ||
    email === "" ||
    password === "" ||
    gender === "" ||
    name === "" ||
    birthday === ""
  ) {
    next(errorHandler(400, "입력값이 비어있습니다."))
  }

  if(password !== confirm_password){
    next(errorHandler(400, "비밀번호가 다릅니다."));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new UserModel({
    email,
    password: hashedPassword,
    gender,
    name,
    birthday,
  });

  try {
    await newUser.save();
    res.json({success: true, message: "회원가입 완료!!"});
  } catch (err) {
    next(err);
  }
};

module.exports = register;
