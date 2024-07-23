import express from "express";
import {
  createTeam,
  getMercenary,
  getTeamDetail,
  patchTeam,
} from "../controllers/team.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/createteam", verifyToken, createTeam);
router.patch("/patchTeam", patchTeam);
router.get("/getMercenary", getMercenary);
router.get("/getMercenaryDetail/:id", getTeamDetail);

export default router;
