const uuid = require('uuid');
const moment = require('moment');

/**
 * Creates a user
 */

const createUser = ({name = ""} = {}) => ({
        id : uuid(),
        name
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
const createChat = ({messages = [], name = "Community", users = []} = {}) => ({
    id : uuid(),
    name,
    messages,
    users,
    typingUsers : []
})

module.exports = {
    createChat,
    createMessage,
    createUser
}