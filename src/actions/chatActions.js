import * as types from './types';

/**
 * Ads a message to array of messages in state
 * @param message
 * @returns {{type: string, message: *}}
 */
export const addMessage = (message) => ({
    type : types.ADD_CHAT_MESSAGE,
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


