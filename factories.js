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
const createMessage = ({message = "", sender = ""} = {}) => ({
        id :uuid(),
        time : moment().format('hh:mm'),
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
    typingUsers : []
});

module.exports = {
    createChat,
    createMessage,
    createUser
}