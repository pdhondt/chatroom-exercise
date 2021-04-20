const express = require('express');
const http = require('http');

const app = express();
const clientPath = `${__dirname}/../client`;

app.use(express.static(clientPath));
const server = http.createServer(app);

const io = require('socket.io')(server);

// import the formatMessage module we created to be able to format our messages with a username and a timestamp
const formatMessage = require('../utils/messages');

const port = 3000;

let counter = 0;

server.listen(port, () => {
    console.log("server running on " + port);
});

// This runs when a client connects
io.on('connection', (socket) => {
    counter++;
    console.log(counter + ' someone connected');

    // Listen for a message to all connected clients
    socket.on('sendToAll', (data) => {
        io.emit('displayMessage', (data));
    });

    // Message only to the originating client
    socket.on('sendToMe', (data) => {
        socket.emit('displayMessage', (data));
    });

    // Message to all clients except the originating client
    socket.broadcast.emit('displayMessage', 'A user has joined the room');

    // Message when a client disconnects
    socket.on('disconnect', () => {
        io.emit('displayMessage', 'A user has left the room');
    });
});
