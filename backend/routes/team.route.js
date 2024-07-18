import express from "express";
import { createTeam, getUserTeam, getMercenary } from "../controllers/team.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/createteam", verifyToken, createTeam);
router.get("/getUserTeam", getUserTeam);
router.get("/getMercenary", getMercenary);

export default router;
