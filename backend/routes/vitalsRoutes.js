import express from "express";
import {
  addVitals,
  getAllVitals,
  getVitalsById,
  updateVitals,
  deleteVitals,
  getVitalsStats
} from "../controllers/vitalsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected
router.use(protect);

router.post("/", addVitals);
router.get("/", getAllVitals);
router.get("/stats", getVitalsStats);
router.get("/:id", getVitalsById);
router.put("/:id", updateVitals);
router.delete("/:id", deleteVitals);

export default router;