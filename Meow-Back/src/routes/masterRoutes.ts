import { Router } from "express";
import {
  getAutoPlaySpeed,
  getAllMessage,
  getAllCategory,
  getAllConfig,
  getAllBanner
} from "../handlers/masterHandlers"


const router = Router();

// GET Method
router.get("/getAutoPlaySpeed", getAutoPlaySpeed);
router.get("/getAllMessage", getAllMessage);
router.get("/getAllCategory", getAllCategory);
router.get("/getAllConfig", getAllConfig);
router.get("/getAllBanner", getAllBanner);

// POST Method

export default router;