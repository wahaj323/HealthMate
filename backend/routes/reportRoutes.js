import express from "express";
import {
  uploadReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport
} from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected
router.use(protect);

router.post("/upload", uploadReport);
router.get("/", getAllReports);
router.get("/:id", getReportById);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);

export default router;