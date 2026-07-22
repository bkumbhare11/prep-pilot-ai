import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import {
  adminDashboard,
  getAllUsers,
  deleteUser,
  getAllSessions,
  deleteSession,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, adminMiddleware, adminDashboard);

router.get("/all-users", authMiddleware, adminMiddleware, getAllUsers);

router.delete(
  "/delete-user/:userId",
  authMiddleware,
  adminMiddleware,
  deleteUser,
);

router.get("/all-sessions", authMiddleware, adminMiddleware, getAllSessions);

router.delete(
  "/delete-session/:sessionId",
  authMiddleware,
  adminMiddleware,
  deleteSession,
);

export default router;
