import express from "express";
import {
  registerSchema,
  loginSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from "../validators/authValidator.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  registerUser,
  login,
  profile,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", validateMiddleware(registerSchema), registerUser);

router.post("/login", validateMiddleware(loginSchema), login);

router.get("/profile", authMiddleware, profile);

router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post(
  "/reset-password/:token",
  validateMiddleware(resetPasswordSchema),
  resetPassword,
);

router.post(
  "/change-password",
  validateMiddleware(changePasswordSchema),
  changePassword,
);

export default router;
