const io = require('./index.js').io;
const {VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED,
    MESSAGE_RECEIVED, MESSAGE_SENT, TYPING, NEW_USER_JOINED, NOTIFICATION} = require('../events');
const { createUser, createMessage} = require('../factories');

let connectedUsers = {};


module.exports = function (socket) {
    //console.log("Socket ID:" + socket.id);

    let sendMessageToChatFromUser;
    let sendTypingToChatFromUser;

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


    // fires after user logs in
    socket.on(USER_CONNECTED, (user) => {
        connectedUsers = addUser(connectedUsers, user);
        //setting kind of global for socket. I also stored it into the Redux Store.
        socket.user = user;
        sendMessageToChatFromUser = sendMessageToChat(user.username);
        sendTypingToChatFromUser  = sendTypingToChat(user);
    });



    // need to pass a callback to here and remove a user from a chat
    socket.on('disconnect', () => {
        if ("user" in socket) {
            connectedUsers = removeUser(connectedUsers, socket.user.username);
            io.emit(USER_DISCONNECTED, connectedUsers);
        }
    });



    // sends a message to a chat from a particular user
    socket.on(MESSAGE_SENT, ({chatId, message}) => {
        sendMessageToChatFromUser(chatId, message);
    });



    // fires on user's typing event
    socket.on(TYPING, ({chatId, isTyping}) => {
        sendTypingToChatFromUser(chatId, isTyping)
    });



    // fires a notification for joining of a new user
    socket.on(NEW_USER_JOINED, ({user, chatId}) => {
        io.emit(`${NOTIFICATION}-${chatId}`, user);
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
 * A higher order function, emits event of sending message in a chat
 * @param sender
 * @returns {Function}
 */
function sendMessageToChat(sender) {
    return (chatId, message) => {
        io.emit(`${MESSAGE_RECEIVED}-${chatId}`, createMessage({message, sender, chatId}));
    }
}


/**
 * A higher order function, sends typing events to all users
 * @param user
 * @returns {Function}
 */
function sendTypingToChat(user) {
    return (chatId, isTyping) => {
        io.emit(`${TYPING}-${chatId}`, {user, isTyping});
    }
}


