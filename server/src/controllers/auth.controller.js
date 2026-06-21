import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ─── SIGNUP ──────────────────────────────────────────────────────────────────

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    // Validation
    if (!name || !email || !password) {
      return ApiResponse.error(res, 400, "Name, email and password are required");
    }

    if (password.length < 6) {
      return ApiResponse.error(res, 400, "Password must be at least 6 characters");
    }

    // Check existing user
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return ApiResponse.error(res, 400, "Email already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(user._id, user.role);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return ApiResponse.success(res, 201, "Account created successfully", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    return ApiResponse.error(res, 500, "Server error");
  }
};

// ─── LOGIN ───────────────────────────────────────────────────────────────────

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    // Validation
    if (!email || !password) {
      return ApiResponse.error(res, 400, "Email and password are required");
    }

    // Find user (include password for comparison)
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");

    if (!user) {
      return ApiResponse.error(res, 401, "Invalid credentials");
    }

    if (!user.isActive) {
      return ApiResponse.error(res, 403, "Your account has been deactivated. Contact support.");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return ApiResponse.error(res, 401, "Invalid credentials");
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return ApiResponse.success(res, 200, "Login successful", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return ApiResponse.error(res, 500, "Server error");
  }
};

// ─── GET ME ──────────────────────────────────────────────────────────────────

export const getMe = async (req, res) => {
  return ApiResponse.success(res, 200, "User fetched", req.user);
};

// ─── LOGOUT ──────────────────────────────────────────────────────────────────
// JWT is stateless — logout is handled on frontend by removing the token.
// This endpoint just confirms the action.

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  return ApiResponse.success(res, 200, "Logged out successfully");
};
