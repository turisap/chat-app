import * as types from './types';
import axios from 'axios';
import config from '../config/chatConfig';

/**
 * Adds a message to array of messages in state
 * @param chatId
 * @param message
 * @returns {{type: string, chatId: *, message: *}}
 */
export const addMessage = (chatId, message) => dispatch => {
    const url = `${config.server.baseURL}/chat/message`;
    const param = new URLSearchParams;
    param.append('chatId', chatId);
    param.append('message', message);
    axios.post(url, param)
        .then(resp => {
            console.log(resp);
            dispatch({
                type : types.ADD_CHAT_MESSAGE,
                chatId,
                message
            })
        })
        .catch(e => console.log(e));
};

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
 * @returns {{type: string, user: *, chatId: *}}
 */
export const addUserToChat = (user) => ({
    type : types.ADD_USER_TO_CHAT,
    user
});


/**
 * Adds or removes a given user from  chat's typingUsers array based on isTyping booleans
 * @param chatId
 * @param user
 * @param isTyping
 * @returns {{type: string, chatId: *, user: *, isTyping: *}}
 */
export const updateTypingInChat = (chatId, user, isTyping) => ({
    type : types.UPDATE_TYPING_IN_CHAT,
    chatId,
    user,
    isTyping
});

