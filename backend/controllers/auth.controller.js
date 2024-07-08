import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { email, password, confirm_password, gender, name, birthday } =
    req.body;

  if (
    !email ||
    !password ||
    !gender ||
    !name ||
    !birthday ||
    email === "" ||
    password === "" ||
    gender === "" ||
    name === "" ||
    birthday === ""
  ) {
    return next(errorHandler(400, "입력값이 비어있습니다."));
  }

  if (password !== confirm_password) {
    return next(errorHandler(400, "비밀번호가 다릅니다."));
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
    res.json({ success: true, message: "회원가입 완료!!" });
  } catch (err) {
    return next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "입력값이 비어있습니다."));
  }

  try {
    const validUser = await UserModel.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "이메일 또는 비밀번호가 다릅니다."));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "이메일 또는 비밀번호가 다릅니다."));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(validUser);
  } catch (err) {
    return next(err);
  }
};
