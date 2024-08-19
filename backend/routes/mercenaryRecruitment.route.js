import express from "express";
import {
  createRecruitment,
  updateRecruitment,
  getRecruitment,
  getRecruitmentDetail,
  deleteRecruitment,
  getMyRecruitment,
} from "../controllers/mercenaryRecruitment.controller.js";
const router = express.Router();

router.post("/recruitment", createRecruitment); 
router.patch("/recruitment/:id", updateRecruitment);
router.get("/recruitments", getRecruitment);
router.get("/myrecruitments", getMyRecruitment);
router.get("/recruitment/:id", getRecruitmentDetail);
router.delete("/recruitment/:id", deleteRecruitment);

export default router;
