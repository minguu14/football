import express from "express";
import {
  createTeam,
  getMercenary,
  getTeamDetail,
  patchTeam,
  deleteMercenary,
} from "../controllers/mercenaryRecruitment.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/createteam", verifyToken, createTeam);
router.patch("/patchTeam/:id", patchTeam);
router.get("/getMercenary", getMercenary);
router.get("/getMercenaryDetail/:id", getTeamDetail);
router.delete("/deleteMercenary/:id", deleteMercenary);

export default router;
