import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import v1Router from "./routes/v1/v1Routes.js";
import { PORT } from './config/serverConfig.js';
import chokidar from 'chokidar';
import { handleEditorSocketEvents } from './socketHandlers/editorHandler.js';
import requestLogger from "./loggers/requestLogger.js";
import responseLogger from "./loggers/responseLogger.js";
import './terminalApp.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        method: ['GET', 'POST'],
    }
});


app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use(cors());
app.use(requestLogger);
app.use(responseLogger);

app.use('/api/v1', v1Router);

const editorNamespace = io.of('/editor');

editorNamespace.on("connection", (socket) => {
    console.log("editor connected");

    // somehow we will get the projectId from frontend;
    let projectId = socket.handshake.query['projectId'];

    console.log("Project id received after connection", projectId);

    if(projectId) {
        var watcher = chokidar.watch(`./projects/${projectId}`, {
            ignored: (path) => path.includes("node_modules"),
            persistent: true, /** keeps the watcher in running state till the time app is running */
            awaitWriteFinish: {
                stabilityThreshold: 2000 /** Ensures stability of files before triggering event */
            },
            ignoreInitial: true /** Ignores the initial files in the directory */
        });

        watcher.on("all", (event, path) => {
            console.log(event, path);
        });
    }

    handleEditorSocketEvents(socket, editorNamespace);

});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(process.cwd())
});
