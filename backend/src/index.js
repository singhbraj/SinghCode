import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import { PORT } from './config/serverConfig.js';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import chokidar from 'chokidar';
import path from 'path';
import { handlerEditorSocketEvents } from './socketHandlers/editorHandler.js';
import queryString from 'querystring';

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

io.on('connection', (socket) => {
    console.log('a user connected');
});

app.use('/api', router);


const editorNamespace = io.of('/editor');

editorNamespace.on('connection', (socket) => {
    console.log('a user connected to editor namespace');

    // somehow we will get the projectId from the frontend 

    let projectId = socket.handshake.query['projectId'] || null;
    console.log("Project id received after connetction",projectId);

    if(projectId){

        var watcher = chokidar.watch(`./projects/${projectId}`,{
            ignored:(path)=>path.includes("node_modules"),
            persistent:true, /** keeps the watcher in running state till the time app is running **/
            awaitWriteFinish:{
                stabilityThreshold: 2000, /** waits for 1 second before emitting the event **/
                pollInterval: 100, /** polls the file every 100ms **/
            }, /** waits for the file to be written to the disk before emitting the event **/
            ignoreInitial:true, /** ignores the initial file change event **/
        })

        watcher.on("all", (event, path) => {
            console.log(`File ${path} has been ${event}`);
            socket.emit('file-changed', {path}) 
        });

    }


    handlerEditorSocketEvents(socket,editorNamespace);
    socket.on('disconnect', () => {
        if (watcher) {
            watcher.close();
        }
        console.log('a user disconnected from editor namespace');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});