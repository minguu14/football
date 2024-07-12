import TeamModel from "../models/team.model.js";
import errorHandler from "../utils/error.js";

export const createTeam = async (req, res, next) => {
  const { age, area, introductions, manner, logo, name, skill } = req.body;
  const newTeam = new TeamModel({
    logo,
    name,
    skill,
    manner,
    age,
    area,
    introductions,
  });
  console.log(newTeam);
  try {
    await newTeam.save();
    res.json("팀이 등록되었습니다.");
  } catch (err) {
    console.log(err);
    return next(errorHandler(400, "팀 등록에 실패했습니다."));
  }
};

export const logo = async (req, res, next) => {
  const logos = await TeamModel.find({});
  res.status(200).json(logos);
}
