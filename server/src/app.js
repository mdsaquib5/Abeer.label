import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
  "http://localhost:3000",
  "http://localhost:3001",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ─── MIDDLEWARES ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── HEALTH CHECK ─────────────────────────────────────────────────────────────
app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Abeer Label API",
  });
});

// ─── ROUTES ───────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);

// ─── ROOT ─────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  const port = process.env.PORT || 4000;
  res.send(`Abeer Label Server is running on ${port}`);
});

export default app;
