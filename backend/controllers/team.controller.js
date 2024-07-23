import TeamModel from "../models/team.model.js";
import errorHandler from "../utils/error.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";

export const createTeam = async (req, res, next) => {
  verifyToken(req, res, async () => {
    const {
      age,
      announcement,
      place,
      cost,
      kick_off,
      play_time,
      quarter,
      people,
      manner,
      name,
      skill,
      positions,
      formation,
    } = req.body;

    const newTeam = new TeamModel({
      name,
      formation,
      skill,
      manner,
      age,
      place,
      kick_off,
      play_time,
      positions,
      people,
      cost,
      quarter,
      announcement,
      owner: req.user._id,
    });
    console.log(newTeam);
    try {
      await newTeam.save();
      res.json({
        success: true,
        message: "팀이 등록되었습니다!",
      });
    } catch (err) {
      console.log(err);
      return next(errorHandler(400, "팀 등록에 실패했습니다."));
    }
  });
};

export const patchTeam = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    const { email } = decoded;

    const updateData = req.body;

    const result = await TeamModel.findOneAndUpdate(
      { owner: email },
      { $set: updateData },
      { new: true }
    );

    console.log(result);
    if (!result) {
      return res.status(404).json({ message: "Team not found" });
    }

    res
      .status(200)
      .json({ message: "Team updated successfully", team: result });
  } catch (error) {
    // console.error('Error updating team:', error);
    // res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMercenary = async (req, res, next) => {
  const teams = await TeamModel.find({});
  res.status(200).json(teams);
};

export const getTeamDetail = async (req, res, next) => {
  const teamId = req.params.id;
  const selectedTeam = await TeamModel.findById(teamId);
  res.status(200).json(selectedTeam);
};
