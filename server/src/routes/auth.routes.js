import express from "express";
import { signup, login, logout, getMe } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ─── PUBLIC ROUTES ────────────────────────────────────────────────────────────
router.post("/signup", signup);
router.post("/login", login);

// ─── PROTECTED ROUTES ─────────────────────────────────────────────────────────
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

export default router;
