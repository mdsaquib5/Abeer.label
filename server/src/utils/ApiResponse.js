/**
 * ApiResponse — standardised response helper
 *
 * Usage:
 *   return ApiResponse.success(res, 200, "Login successful", { token, user });
 *   return ApiResponse.error(res, 400, "Email already registered");
 */

export class ApiResponse {
  static success(res, statusCode = 200, message = "Success", data = null) {
    const payload = { success: true, message };
    if (data !== null) payload.data = data;
    return res.status(statusCode).json(payload);
  }

  static error(res, statusCode = 500, message = "Internal server error") {
    return res.status(statusCode).json({ success: false, message });
  }
}
