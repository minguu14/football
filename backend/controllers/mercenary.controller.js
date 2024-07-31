import MercenaryModel from "../models/mercenary.model.js";
import TeamModel from "../models/team.model.js";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

export const mercenary = async (req, res, next) => {
  const { real_name, contact, positions, player, teamId } = req.body;
  const newMercenary = new MercenaryModel({
    real_name,
    contact,
    positions,
    player,
    mercenary_teamId: teamId,
  });

  try {
    await newMercenary.save();
    res.status(200).json("용병 신청이 완료되었습니다.");
  } catch (err) {
    console.log(err);
    return next(errorHandler(400, "용병 신청이 실패했습니다."));
  }
};

export const getMercenaryList = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    const owner = jwt.verify(token, process.env.ACCESS_SECRET);
    const ownerTeam = await TeamModel.find({ owner: owner._id });
    const ownerTeamIds = ownerTeam.map((team) => team._id);
    const mercenaryLists = await MercenaryModel.find({
      mercenary_teamId: { $in: ownerTeamIds },
    });

    if (mercenaryLists) {
      res.status(200).json(mercenaryLists);
    } else {
      res.json({ message: "신청한 용병이 없습니다." });
    }
  } catch (err) {
    next(errorHandler(500, "데이터를 가져오는데 실패했습니다."));
  }
};

export const acceptMember = async (req, res, next) => {
  const member = req.body;
  const result = await TeamModel.findOneAndUpdate(
    { _id: member.mercenary_teamId },
    {
      $set: {
        recruited_people: member,
      },
    },
    { new: true }
  );
  console.log(result);
};

export const rejectMember = async (req, res, next) => {
  const { id } = req.body;
  console.log(id);
  const result = await MercenaryModel.deleteOne({ _id: id });
  console.log(result);
};
