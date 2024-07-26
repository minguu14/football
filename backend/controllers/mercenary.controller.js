import MercenaryModel from "../models/mercenary.model.js";

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
    res.json("용병 신청이 완료되었습니다.");
  } catch (err) {
    console.log(err);
    return next(errorHandler(400, "용병 신청이 실패했습니다."));
  }
};
