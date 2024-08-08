import MercenaryModel from "../models/mercenary.model.js";
import MercenaryRecruitmentModel from "../models/mercenaryRecruitment.model.js";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

export const mercenary = async (req, res, next) => {
  try {
    const { comment, positions, player } = req.body;
    const { id } = req.params;
    const token = req.cookies.accessToken;
    const userInfo = jwt.verify(token, process.env.ACCESS_SECRET);

    const newMercenary = new MercenaryModel({
      real_name: userInfo.real_name,
      contact: userInfo.phone_number,
      positions,
      player,
      comment,
      isAccepted: false,
      mercenary_teamId: id,
      user_id: userInfo._id,
    });

    if (!newMercenary) {
      res.status(400).json({
        application_status: false,
        message: "용병 신청이 실패했습니다.",
      });
    }

    await newMercenary.save();

    res.status(201).json({
      application_status: true,
      message: "용병 신청이 완료되었습니다.",
    });
  } catch (err) {
    return next(errorHandler(err));
  }
};

export const applicationCheck = async (req, res, next) => {
  const { id } = req.params;
  const token = req.cookies.accessToken;
  const userInfo = jwt.verify(token, process.env.ACCESS_SECRET);

  const myMercenary = await MercenaryModel.findOne({
    mercenary_teamId: id,
    user_id: userInfo._id,
  });

  if (myMercenary) {
    res.status(200).json({ success: true });
  } else {
    res.status(200).json({ success: false });
  }
};

export const cancelApplication = async (req, res, next) => {
  const { id } = req.params;
  const token = req.cookies.accessToken;
  const userInfo = jwt.verify(token, process.env.ACCESS_SECRET);

  const myMercenary = await MercenaryModel.findOne({
    mercenary_teamId: id,
    user_id: userInfo._id,
  });

  if (myMercenary) {
    await MercenaryModel.deleteOne({ _id: myMercenary._id });
    res.status(200).json({ success: false });
  }
};

export const getMercenaries = async (req, res, next) => {
  const { teamId } = req.body;

  try {
    const mercenaries = await MercenaryModel.find({
      mercenary_teamId: teamId,
    });
    if (mercenaries) {
      res.status(200).json(mercenaries);
    } else {
      res.json("신청현 용병 내역이 없습니다.");
    }
  } catch (err) {
    next(500, "데이터를 가져오는데 실패했습니다.");
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
          recruited_member: member.user_id,
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
    { recruited_member: member.user_id },
    {
      $pull: {
        recruited_member: member.user_id,
      },
    },
    { new: true }
  );

  res.status(200).json("취소");
};
