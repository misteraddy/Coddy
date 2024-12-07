import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import v1Router from "./routes/v1/v1Routes.js";
import responseLogger from "./loggers/responselogger.js";

dotenv.config();

const app = express();

// Fallback for PORT
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

app.use(responseLogger);

// API Routes
app.use("/api/v1", v1Router);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
