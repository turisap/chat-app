const io = require('./index.js').io;
const {VERIFY_USER, USER_CONNECTED, LOGOUT, COMMUNITY_CHAT,
    USER_DISCONNECTED, MESSAGE_RECEIVED, MESSAGE_SENT, TYPING} = require('../events');
const { createUser, createMessage, createChat } = require('../factories');

let connectedUsers = {};
let communityChat = createChat();

module.exports = function (socket) {
    console.log("Socket ID:" + socket.id);

    let sendMessageToChatFromUser;
    let sendTypingFromUser;

    // Verify Username
    socket.on(VERIFY_USER, (nickname, callback) => {
        if(isUser(connectedUsers, nickname)) callback({isUser: true, user : null});
        else callback({isUser : false, user : createUser({name : nickname})})
    });

    // User connects with a username
    socket.on(USER_CONNECTED, (user) => {
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user; // for usage everywhere in the code, kind of socket global
        //!!!!!!!!!! this func return another function which we can use anywhere after connection in this socket manager 45:51 and a bit earlier in the video
        sendMessageToChatFromUser = sendMessageToChat(user.name);
        sendTypingFromUser = sendTypingToChat(user.name);
    });

    socket.on(COMMUNITY_CHAT, (callback)=>{
        callback(communityChat)
    });

    socket.on('disconnect', () => {
        if ("user" in socket) {
            connectedUsers = removeUser(connectedUsers, socket.user.name);
        }
        io.emit(USER_DISCONNECTED, connectedUsers);
        //console.log("From Disconnection" + connectedUsers);
    });

    socket.on(LOGOUT, () => {
        connectedUsers = removeUser(connectedUsers, socket.user.name);
        io.emit(USER_DISCONNECTED, connectedUsers);
        //console.log("LOGOUT" + connectedUsers);
    });

    socket.on(MESSAGE_SENT, ({chatId, message}) => {
        sendMessageToChatFromUser(chatId, message);
    });
    socket.on(TYPING, ({chatId, isTyping}) => {
        // console.log(chatId, isTyping);
        sendTypingFromUser(chatId, isTyping);
    })
};

/**
 * Adds a user to the user list
 */

function addUser (userList, user) {
    let newList = Object.assign({}, userList);
    newList[user.name] = user;
    return newList;
}

/**
 *  Removes a user from the list
 */

function removeUser(userList, username) {
    let newList = Object.assign({}, userList);
    delete newList[username];
    return newList;
}

/**
 *  Checks if a user is in list which passed in
 */

function isUser(userList, userName) {
    return userName in userList;
}

/**
 * Emits event of sending message in a chat
 * @param sender
 * @returns {Function}
 */
function sendMessageToChat(sender) {
    return (chatId, message) => {
        io.emit(`${MESSAGE_RECEIVED}-${chatId}`, createMessage(message, sender));
    }
}

/**
 * Sends typing events to all users
 * @param user
 * @returns {Function}
 */
function sendTypingToChat(user) {
    return (chatId, isTyping) => {
        io.emit(`${TYPING}-${chatId}`, {user, isTyping});
    }
}