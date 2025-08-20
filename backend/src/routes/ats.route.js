// routes/ats.routes.js
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { atsFromResumeData,atsFromPDF } from "../controllers/ats.controller.js";

const router = Router();

// For resumeData JSON
router.post("/ats-score-data", atsFromResumeData);

// For PDF resume
router.post("/ats-score-pdf", upload.single("resume"), atsFromPDF);

export default router;
