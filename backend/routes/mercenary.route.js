import express from "express";
import { mercenary } from "../controllers/mercenary.controller.js";
const router = express.Router();

router.post("/mercenary", mercenary);

export default router;
