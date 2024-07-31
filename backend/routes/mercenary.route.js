import express from "express";
import {
  mercenary,
  getMercenaryList,
  acceptMember,
  rejectMember,
} from "../controllers/mercenary.controller.js";
const router = express.Router();

router.post("/mercenary", mercenary);
router.get("/mercenarylist", getMercenaryList);
router.patch("/acceptmember", acceptMember);
router.delete("/rejectmember", rejectMember);

export default router;
