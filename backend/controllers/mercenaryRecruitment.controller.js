import errorHandler from "../utils/error.js";
import MercenaryRecruitmentModel from "../models/mercenaryRecruitment.model.js";
import jwt from "jsonwebtoken";

export const createRecruitment = async (req, res, next) => {
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

export const updateRecruitment = async (req, res, next) => {
  try {
    const teamId = req.params.id;

    const updateData = req.body;

    const teamData = await MercenaryRecruitmentModel.findOneAndUpdate(
      { _id: teamId },
      { $set: updateData },
      { new: true }
    );

    if (!teamData) {
      return res
        .status(404)
        .json({ success: false, message: "해당 팀이 없습니다." });
    }

    res.status(200).json({
      success: true,
      message: "팀 정보가 수정되었습니다.",
      team: teamData,
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const deleteRecruitment = async (req, res, next) => {
  try {
    const teamId = req.params.id;
    await MercenaryRecruitmentModel.deleteOne({ _id: teamId });
    res
      .status(200)
      .json({ success: true, message: "용병 모집이 삭제되었습니다." });
  } catch (err) {
    return next(errorHandler(err));
  }
};

export const getAllRecruitment = async (req, res, next) => {
  try {
    const teams = await MercenaryRecruitmentModel.find({});
    if (!teams) {
      return res
        .status(404)
        .json({ success: false, message: "용병 모집이 없습니다." });
    }
    res.status(200).json(teams.reverse());
  } catch (err) {
    return next(errorHandler(err));
  }
};

export const getMyRecruitment = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    const userInfo = jwt.verify(token, process.env.ACCESS_SECRET);

    const myRecruitment = await MercenaryRecruitmentModel.find({owner: userInfo._id});
    
    if(myRecruitment){
      res.status(200).json(myRecruitment);
    }else{
      res.status(204).json({success: false, message: "모집 내역이 없습니다."});
    }
  } catch (err) {
    return next(errorHandler(err));
  }
};

export const getRecruitmentDetail = async (req, res, next) => {
  try {
    const teamId = req.params.id;
    const selectedTeam = await MercenaryRecruitmentModel.findById(teamId);
    if (!selectedTeam) {
      return res
        .status(404)
        .json({ success: false, message: "선택한 팀 정보가 없습니다." });
    }
    res.status(200).json(selectedTeam);
  } catch (err) {
    next(errorHandler(err));
  }
};
