import TeamModel from "../models/mercenaryRecruitment.model.js";
import errorHandler from "../utils/error.js";
import MercenaryRecruitmentModel from "../models/mercenaryRecruitment.model.js";
import jwt from "jsonwebtoken";

export const createTeam = async (req, res, next) => {
  try {
    const {
      teamName,
      formation,
      skillLevel,
      manners,
      ageGroup,
      field,
      address,
      matchStartTime,
      totalMatchTime,
      recruitingPositions,
      recruitingNumber,
      recruitedMembers,
      cost,
      minimumQuarter,
      comment,
    } = req.body;

    const token = req.cookies.accessToken;
    const userInfo = jwt.verify(token, process.env.ACCESS_SECRET);

    const newTeam = new MercenaryRecruitmentModel({
      teamName,
      formation,
      skillLevel,
      manners,
      ageGroup,
      field,
      address,
      matchStartTime,
      totalMatchTime,
      recruitingPositions,
      recruitingNumber,
      recruitedMembers,
      cost,
      minimumQuarter,
      comment,
      owner: userInfo._id,
    });

    await newTeam.save();

    res.status(201).json({
      success: true,
      message: "팀이 등록되었습니다!",
    });
  } catch (err) {
    return next(errorHandler(err));
  }
};

export const patchTeam = async (req, res, next) => {
  try {
    const teamId = req.params.id;

    const updateData = req.body;

    const result = await TeamModel.findOneAndUpdate(
      { _id: teamId },
      { $set: updateData },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Team not found" });
    }

    res
      .status(200)
      .json({ message: "Team updated successfully", team: result });
  } catch (error) {
    console.error("Error updating team:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteMercenary = async (req, res, next) => {
  const teamId = req.params.id;
  await TeamModel.deleteOne({ _id: teamId });
  res.status(200).json("모집 삭제");
};

export const getMercenary = async (req, res, next) => {
  const teams = await TeamModel.find({});
  res.status(200).json(teams.reverse());
};

export const getTeamDetail = async (req, res, next) => {
  const teamId = req.params.id;
  const selectedTeam = await TeamModel.findById(teamId);
  res.status(200).json(selectedTeam);
};
