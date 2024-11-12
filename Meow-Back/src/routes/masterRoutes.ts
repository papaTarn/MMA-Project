import { Router } from "express";
import {
  getAutoPlaySpeed,
  getBanner,
  getAllMessage,
  getAllCategory,
  getAllConfig,
} from "../handlers/masterHandlers"


const router = Router();

// GET Method
router.get("/getAutoPlaySpeed", getAutoPlaySpeed);
router.get("/getBanner", getBanner);
router.get("/getAllMessage", getAllMessage);
router.get("/getAllCategory", getAllCategory);
router.get("/getAllConfig", getAllConfig);

// POST Method

export default router;