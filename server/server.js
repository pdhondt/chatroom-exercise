const express = require('express');
const http = require('http');

const app = express();
const clientPath = '${__dirname}/../client';

app.use(express.static(clientPath));
const server = http.createServer(app);

const io = require('socket.io')(server);

const port = 8080;

server.listen(port, () => {
    console.log("server running on " + port)
});
