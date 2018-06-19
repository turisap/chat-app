const server = require('http').createServer();
const express = require('express');
const app = express();
const io = module.exports.io = require('socket.io')(server);


const socketManager = require('./SocketManager');
const ChatRouter = require('./routs/ChatRouter');

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log("Connected to port", PORT));
app.listen(3000, () => console.log('EXPRESS'));

// socket manager for real-time communication in chat
io.on('connect', socketManager);

app.use('/chat', ChatRouter);


