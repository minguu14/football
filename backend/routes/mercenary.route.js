import express from "express";
import {
  mercenary,
  getMercenaryList,
  acceptMember,
  rejectMember,
  cancelMember,
} from "../controllers/mercenary.controller.js";
const router = express.Router();

router.post("/mercenary", mercenary);
router.get("/mercenarylist", getMercenaryList);
router.patch("/acceptmember", acceptMember);
router.patch("/cancelmember", cancelMember);
router.delete("/rejectmember", rejectMember);

export default router;
