import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import v1Router from "./routes/v1/v1Routes.js";
import chokidar from "chokidar";
import { chokidarConfig } from "./config/chokidarConfig.js";
import { handleChokidarEvents } from "./utils/chokidarEvents.js";
import { handleEditorSocketEvents } from "./socketHandler/editorHandler.js";
import requestLogger from "./loggers/requestLogger.js";
import responseLogger from "./loggers/responseLogger.js";
import { handleTerminalSocketEvents } from "./socketHandler/terminalHandler.js";
import { handleContainerCreate } from "./containers/handleContainerCreate.js";

dotenv.config();

// Express setup
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(requestLogger);
app.use(responseLogger);

// API Routes
app.use("/api/v1", v1Router);

// Socket.IO Namespaces
const editorNamespace = io.of("/editor");
editorNamespace.on("connection", (socket) => {
  console.log("Editor connected");

  const projectId = socket.handshake.query["projectId"];

  if (projectId) {
    const watcher = chokidar.watch(
      `/projects/${projectId}`,
      chokidarConfig(projectId)
    );
    handleChokidarEvents(watcher);
  }

  handleEditorSocketEvents(socket);
});

const terminalNamespace = io.of("/terminal");

terminalNamespace.on("connection", (socket) => {
  console.log("Terminal connected");

  const projectId = socket.handshake.query["projectId"];

  handleTerminalSocketEvents(socket, terminalNamespace);

  handleContainerCreate(projectId, socket);
});

// Fallback for PORT
const PORT = process.env.PORT || 5000;

// Start Server
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
