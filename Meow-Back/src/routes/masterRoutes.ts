import { Router } from "express";
import {
  getAllMessage,
  getAllCategory,
  getAllConfig
} from "../handlers/masterHandlers"


const router = Router();

// GET Method
router.get("/getAllMessage", getAllMessage);
router.get("/getAllCategory", getAllCategory);
router.get("/getAllConfig", getAllConfig);

// POST Method

export default router;