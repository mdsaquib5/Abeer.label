import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export const protect = (allowedRoles = []) => async (req, res, next) => {
    try {
        let token;
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
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
                message: "Your account has been deactivated",
            });
        }

        // Check Roles if any are specified
        if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: You don't have permission to access this resource",
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