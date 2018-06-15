import * as types from './types';

/**
 * Adds a message to array of messages in state
 * @param chatId
 * @param message
 * @returns {{type: string, chatId: *, message: *}}
 */
export const addMessage = (chatId, message) => ({
    type : types.ADD_CHAT_MESSAGE,
    chatId,
    message
});

/**
 * Sets socket property to the state
 * @param socket
 * @returns {{type: string, socket: *}}
 */
export const setSocket = (socket) => ({
    type : types.SET_SOCKET,
    socket
});


/**
 * Logs a current user out of a chat
 */
export const logoutFromChat = (chatId) => ({
    type : types.LOGOUT_FROM_CHAT,
    chatId
});


/**
 * Sets active chat property to a provided chat
 * @param chat
 * @returns {{type: string, chat: *}}
 */
export const setActiveChat = (chat) => ({
    type : types.SET_ACTIVE_CHAT,
    chat
});


/**
 * Adds a given user to chat's users array
 * @param user
 * @param chatId
 * @returns {{type: string, user: *, chatId: *}}
 */
export const addUserToChat = (user) => ({
    type : types.ADD_USER_TO_CHAT,
    user
});

