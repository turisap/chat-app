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
    axios.post(url, {chatId, message})
        .then(resp => {
            if (window.DEBUG) console.log(resp);
            dispatch({
                type : types.ADD_CHAT_MESSAGE,
                chatId,
                message
            })
        })
        .catch(e => console.log(e));
};



/**
 * Fetches messages from a server based on chat id and sets them into Redux store
 * @param chatId
 * @returns {Function}
 */
export const getMessages = chatId => dispatch => {
    axios.get(`${config.server.baseURL}/chat/messages`, {headers :{chatId}})
        .then(resp => {
            const messages = resp.data.messages.map(m => JSON.parse(JSON.parse(m)));
            if (window.DEBUG) console.log(messages);
            dispatch({
                type: types.SET_MESSAGES,
                messages
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
export const addUserToChat = (user, chatId) => dispatch => {
    const url = `${config.server.baseURL}/chat/user`;
    axios.post(url, {user, chatId})
        .then(resp => {
            //if (window.DEBUG) console.log(resp);
            dispatch({
                type : types.ADD_USER_TO_CHAT,
                user,
                resp
            });
        })
        .catch(e => {if(window.DEBUG) console.log(e)});
};


/**
 * Retrieves a user list from server based on chatId and sets it to the Redux store.
 * @param chatId
 * @returns {Function}
 */
export const getChatUsersFromServer = chatId => dispatch => {
    const url = `${config.server.baseURL}/chat/users`;
    axios.get(url, {headers : {chatId}})
        .then(resp => {
            const users = resp.data.users.map(u => JSON.parse(u));
            if(window.DEBUG) console.log('USERLIST', users);
            dispatch({
                type : types.SET_USERLIST,
                users
            })
        })
        .catch(e => console.log(e.response.data))
};



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

