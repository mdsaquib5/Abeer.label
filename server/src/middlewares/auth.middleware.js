import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * protect — JWT auth middleware
 * Use alone for any logged-in user, or combine with adminOnly() for role gating.
 *
 * Usage:
 *   router.get("/me", protect, getMe);
 *   router.get("/admin/users", protect, adminOnly("admin", "manager"), handler);
 */
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check cookies first
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } 
    // Fallback to Authorization header
    else {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated. Contact support.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
