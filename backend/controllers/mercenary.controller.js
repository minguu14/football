import MercenaryModel from "../models/mercenary.model.js";
import errorHandler from "../utils/error.js";

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
    const mercenaryLists = await MercenaryModel.find({});
    if (mercenaryLists) {
      res.json(mercenaryLists);
    } else {
      res.status(200).json("신청한 용병이 없습니다.");
    }
  } catch (err) {
    next(errorHandler(500, "데이터를 가져오는데 실패했습니다."));
  }
};
