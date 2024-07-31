import TeamModel from "../models/team.model.js";
import errorHandler from "../utils/error.js";
import { verifyToken } from "../middleware/authMiddleware.js";

export const createTeam = async (req, res, next) => {
  verifyToken(req, res, async () => {
    const {
      age,
      announcement,
      place,
      address,
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
      address,
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
    const teamId = req.params.id;

    const updateData = req.body;

    const result = await TeamModel.findOneAndUpdate(
      { _id: teamId },
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
    console.error("Error updating team:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteMercenary = async (req, res, next) => {
  const teamId = req.params.id;
  console.log(teamId);
  await TeamModel.deleteOne({ _id: teamId });
  res.status(200).json("모집 삭제");
};

export const getMercenary = async (req, res, next) => {
  const teams = await TeamModel.find({});
  res.status(200).json(teams.reverse());
};

export const getTeamDetail = async (req, res, next) => {
  const teamId = req.params.id;
  console.log(teamId);
  const selectedTeam = await TeamModel.findById(teamId);
  res.status(200).json(selectedTeam);
};
