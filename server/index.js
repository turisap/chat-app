const app = require('http').createServer();
const io = module.exports.io = require('socket.io')(app);


const PORT = process.env.PORT || 8085;

const socketManager = require('./SocketManager');

io.on('connnection', socketManager);

app.listen(PORT, () => {
    console.log("Connected to port", PORT);
})