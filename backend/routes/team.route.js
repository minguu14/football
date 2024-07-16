import express from "express";
import { createTeam, getUserTeam } from "../controllers/team.controller.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/createteam", verifyToken, createTeam);
router.get("/getUserTeam", getUserTeam);

export default router;
