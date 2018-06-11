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


