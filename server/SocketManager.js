const io = require('./index.js').io;
const {VERIFY_USER, USER_CONNECTED, LOGOUT, COMMUNITY_CHAT,
    USER_DISCONNECTED, MESSAGE_RECEIVED, MESSAGE_SENT, TYPING} = require('../events');
const { createUser, createMessage, createChat } = require('../factories');

let connectedUsers = {};
let communityChat = createChat();

module.exports = function (socket) {
    console.log("Socket ID:" + socket.id);

    /**
     * Verification of username existence on the "back-end"
     * SHOULD BE REVISED
     */
    socket.on(VERIFY_USER, (username, callback) => {
        if(isUser(connectedUsers, username)) {
            callback({userExists : true, user : null});
        } else {
            callback({userExists: false, user : createUser(username)})
        }
    });

    socket.on(USER_CONNECTED, (user) => {
        connectedUsers = addUser(connectedUsers, user);
        //setting kind of global for socket. I also stored it into the Redux Store.
        socket.user = user;
        console.log(connectedUsers);
    })
};


/**
 * Adds a user to the user list
 */

function addUser (userList, user) {
    let newList = Object.assign({}, userList);
    newList[user.username] = user;
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