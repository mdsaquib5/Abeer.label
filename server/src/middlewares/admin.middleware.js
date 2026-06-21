/**
 * adminOnly — Role-based access control middleware
 * Must be used AFTER protect middleware.
 *
 * Usage:
 *   router.get("/admin/users", protect, adminOnly("admin", "manager"), handler);
 *   router.delete("/admin/user/:id", protect, adminOnly("admin"), handler);
 */
export const adminOnly = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied: Insufficient permissions",
      });
    }

    next();
  };
};
