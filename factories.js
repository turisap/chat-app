const uuid = require('uuid/v4');
const moment = require('moment');



/**
 * Creates a user
 */
const createUser = (username) => ({
        id : uuid(),
        username
});


/**
 * Creates a message
 */
const createMessage = ({message = "", sender = "", chatId} = {}) => ({
        id : uuid(),
        chatId,
        time : moment().format('HH:mm'),
        timeStamp : moment().valueOf(), //new Date().getTime(),
        message,
        sender
});


/**
 * Creates a chat
 */
const createChat = ({messages = [], name = 'test', users = []} = {}) => ({
    id :  9,
    name,
    messages,
    users,
    typingUsers : [],
    newUsers : []
});



module.exports = {
    createChat,
    createMessage,
    createUser
};