import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { createSessionSchema } from "../validators/sessionValidator.js";
import {
  createSession,
  submitAnswer,
  finishSession,
  getResult,
  getHistory,
  getSessionById,
  getDashboardStats,
  deleteSession,
} from "../controllers/sessionController.js";

const router = express.Router();

router.post(
  "/create-session",
  authMiddleware,
  validateMiddleware(createSessionSchema),
  createSession,
);

router.post("/:sessionId/answer", authMiddleware, submitAnswer);

router.post("/:sessionId/finish-session", authMiddleware, finishSession);

router.get("/:sessionId/result", authMiddleware, getResult);

router.get("/history", authMiddleware, getHistory);

router.get("/dashboard-stats", authMiddleware, getDashboardStats);

router.get("/:sessionId", authMiddleware, getSessionById);

router.delete("/:sessionId/delete-session", authMiddleware, deleteSession);

export default router;
