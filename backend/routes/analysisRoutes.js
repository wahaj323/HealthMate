import express from "express";
import {
  analyzeReport,
  getReportInsight,
  getAllInsights
} from "../controllers/analysisController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected
router.use(protect);

router.post("/analyze/:reportId", analyzeReport);
router.get("/insight/:reportId", getReportInsight);
router.get("/insights", getAllInsights);

export default router;