import jwt from "jsonwebtoken";
import errorHandler from "../utils/error.js";
import UserModel from "../models/user.model.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return next(errorHandler(401, "인증이 필요합니다."));
  }

  jwt.verify(token, process.env.ACCESS_SECRET, async (err, decoded) => {
    if (err) {
      return next(errorHandler(403, "유효하지 않은 토큰입니다."));
    }
    try {
      const user = await UserModel.findById(decoded._id);
      if (!user) {
        return next(errorHandler(404, "사용자를 찾을 수 없습니다."));
      }
      req.user = user;
    } catch (err) {
      next(err);
    }

    next();
  });
};
