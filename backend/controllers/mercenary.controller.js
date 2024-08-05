import MercenaryModel from "../models/mercenary.model.js";
import TeamModel from "../models/team.model.js";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/authMiddleware.js";

export const mercenary = async (req, res, next) => {
  verifyToken(req, res, async () => {
    const { real_name, contact, positions, player, teamId, isAccepted } =
      req.body;
      
    const newMercenary = new MercenaryModel({
      real_name,
      contact,
      positions,
      player,
      mercenary_teamId: teamId,
      isAccepted,
      user_id: req.user._id,
    });

    try {
      await newMercenary.save();
      res.status(200).json("용병 신청이 완료되었습니다.");
    } catch (err) {
      console.log(err);
      return next(errorHandler(400, "용병 신청이 실패했습니다."));
    }
  });
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

  const test = await MercenaryModel.findOneAndUpdate(
    { _id: member._id },
    {
      $set: {
        isAccepted: true,
      },
    },
    { new: true }
  );

  if (test.isAccepted) {
    await TeamModel.findOneAndUpdate(
      { _id: member.mercenary_teamId },
      {
        $push: {
          recruited_member: member._id,
        },
      },
      { new: true }
    );
  }

  res.status(200).json({ success: true });
};

export const rejectMember = async (req, res, next) => {
  const { id } = req.body;
  await MercenaryModel.deleteOne({ _id: id });
  res.status(200).json("용병 거절");
};

export const cancelMember = async (req, res, next) => {
  const member = req.body;

  await MercenaryModel.findOneAndUpdate(
    { _id: member._id },
    {
      $set: {
        isAccepted: false,
      },
    },
    { new: true }
  );

  await TeamModel.findOneAndUpdate(
    { recruited_member: member._id },
    {
      $pull: {
        recruited_member: member._id,
      },
    },
    { new: true }
  );

  res.status(200).json("취소");
};
