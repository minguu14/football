import express from "express";
import {
  createTeam,
  getUserTeam,
  getMercenary,
  getTeamDetail,
  patchTeam,
} from "../controllers/team.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/createteam", verifyToken, createTeam);
router.patch("/patchTeam", patchTeam);
router.get("/getUserTeam", getUserTeam);
router.get("/getMercenary", getMercenary);
router.get("/getMercenaryDetail/:id", getTeamDetail);


export default router;
