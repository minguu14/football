import express from "express";
import {
  createRecruitment,
  updateRecruitment,
  getAllRecruitment,
  getRecruitmentDetail,
  deleteRecruitment,
} from "../controllers/mercenaryRecruitment.controller.js";
const router = express.Router();

router.post("/recruitment", createRecruitment); 
router.patch("/recruitment/:id", updateRecruitment);
router.get("/recruitments", getAllRecruitment);
router.get("/recruitment/:id", getRecruitmentDetail);
router.delete("/recruitment/:id", deleteRecruitment);

export default router;
