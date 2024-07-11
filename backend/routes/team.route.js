import express from "express";
import { createTeam } from "../controllers/team.controller.js";
const router = express.Router();

router.post("/createteam", createTeam);

export default router;
