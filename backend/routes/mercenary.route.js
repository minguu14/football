import express from "express";
import {
  mercenary,
  getMercenaryList,
} from "../controllers/mercenary.controller.js";
const router = express.Router();

router.post("/mercenary", mercenary);
router.get("/mercenarylist", getMercenaryList);

export default router;
