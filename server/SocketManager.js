const io = require('./index.js').io;
const {VERIFY_USER, USER_CONNECTED, LOGOUT, COMMUNITY_CHAT} = require('../events');
const { createUser, createMessage, createChat } = require('../factories');

let connectedUsers = {};
let communityChat = createChat();

module.exports = function (socket) {
    console.log("Socket ID:" + socket.id);

    // Verify Username
    socket.on(VERIFY_USER, (nickname, callback) => {
        if(isUser(connectedUsers, nickname)) callback({isUser: true, user : null});
        else callback({isUser : false, user : createUser({name : nickname})})
    });

    // User connects with a username
    socket.on(USER_CONNECTED, (user) => {
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user; // for usage everywhere in the code, kind of socket global
        console.log(connectedUsers);
    })

    socket.on(COMMUNITY_CHAT, (callback)=>{
        callback(communityChat)
    });

}

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