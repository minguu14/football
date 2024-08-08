import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const {
      email,
      password,
      confirm_password,
      gender,
      birthday,
      real_name,
      nickname,
      phone_number,
    } = req.body;

    if (
      !email ||
      !password ||
      !gender ||
      !birthday ||
      !real_name ||
      !nickname ||
      !phone_number ||
      email === "" ||
      password === "" ||
      gender === "" ||
      birthday === "" ||
      real_name === "" ||
      nickname === "" ||
      phone_number === ""
    ) {
      return next(
        errorHandler(400, { success: false, message: "입력값이 비었습니다." })
      );
    }

    const user = await UserModel.findOne({ email });
    if (user && email === user.email) {
      return next(
        errorHandler(400, {
          success: false,
          message: "이메일이 중복되었습니다.",
        })
      );
    }

    if (password !== confirm_password) {
      return next(
        errorHandler(400, { success: false, message: "비밀번호가 다릅니다." })
      );
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      gender,
      birthday,
      real_name,
      nickname,
      phone_number,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "회원가입 완료!!" });
  } catch (err) {
    return next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
      return next(errorHandler(400, "입력값이 비어있습니다."));
    }

    const validUser = await UserModel.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "이메일 또는 비밀번호가 다릅니다."));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "이메일 또는 비밀번호가 다릅니다."));
    }

    console.log(validUser);

    const accessToken = jwt.sign(
      {
        ...validUser._doc,
        password: undefined,
      },
      process.env.ACCESS_SECRET
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
    });

    const userInfo = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    res.status(200).json(userInfo);
  } catch (err) {
    return next(err);
  }
};

export const logOut = (req, res, next) => {
  try {
    res.cookie("accessToken", "");
    res.status(200).json("로그아웃 성공!");
  } catch (err) {
    return res.status(500).json(err);
  }
};
