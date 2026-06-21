import express from "express";
import { signup, login, logout, getMe } from "../controllers/user.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

// Public routes (no auth needed)
router.post("/signup", signup);
router.post("/login", login);

// Protected routes (any logged-in user)
router.post("/logout", protect(), logout);
router.get("/me", protect(), getMe);

export default router;