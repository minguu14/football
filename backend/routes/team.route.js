import express from "express";
import { createTeam, logo } from "../controllers/team.controller.js";
const router = express.Router();

router.post("/createteam", createTeam);
router.get("/logo", logo);

export default router;
