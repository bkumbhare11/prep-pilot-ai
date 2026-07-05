import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true, message: "Pre-Pilot Api is Running" });
});

app.use("/api/auth", authRoutes);

app.use("/api/session", sessionRoutes);

app.use("/api/admin", adminRoutes);

export default app;
