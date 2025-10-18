// ✅ Add error handlers at the top
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

// ✅ Imports (ALL imports must be at the top)
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// ✅ Gemini import (updated to match your gemini.js)
import ai, { modelName } from "./config/gemini.js";

// ✅ Routes
import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import vitalsRoutes from "./routes/vitalsRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";

// ✅ ES module dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

// ✅ CORS setup (for production - adjust origin as needed)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Basic middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ File upload middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    abortOnLimit: true,
    createParentPath: true,
  })
);

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/vitals", vitalsRoutes);
app.use("/api/analysis", analysisRoutes);

// ✅ Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "HealthMate API running on Render",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ✅ Gemini test route (updated)
app.get("/api/test-gemini", async (req, res) => {
  try {
    const result = await ai.models.generateContent({
      model: modelName,
      contents: "Say hello from Gemini 2.5 Flash 🚀",
    });
    res.send(result.text);
  } catch (error) {
    console.error("Gemini test failed:", error);
    res.status(500).send(error.message);
  }
});

// ✅ Serve static files from dist folder in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the dist folder
  app.use(express.static(path.join(__dirname, 'dist')));

  // Handle client-side routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  // Development route
  app.get("/", (req, res) => res.send("HealthMate API (Development Mode)"));
}

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'production' ? {} : err.message,
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🏥 HealthMate API ready in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});