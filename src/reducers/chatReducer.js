import * as chatActions from '../actions/types';


const chatReducerDefaultState = {
    socket : null,
    activeChat : null,
};

export default (state=chatReducerDefaultState, action) => {

    switch(action.type) {
        case chatActions.ADD_CHAT_MESSAGE:
            return {
                ...state,
                activeChat : {
                    ...state.activeChat,
                    messages : addMessageToChat(action.message, state, action.chatId)
                }

            };
        case chatActions.SET_SOCKET:
            return {
                ...state,
                socket : action.socket
            };
        // case chatActions.LOGOUT_FROM_CHAT:
        //     return {
        //         ...state,
        //         chats : state.chats.filter(chat => action.chatId !== chat.id)
        //     };
        case chatActions.SET_ACTIVE_CHAT:
            return {
                ...state,
                activeChat : action.chat
            };
        case chatActions.ADD_USER_TO_CHAT:
            return {
                ...state,
                activeChat : {
                    ...state.activeChat,
                    users : state.activeChat.users.concat(action.user)
                }
            };
        case chatActions.UPDATE_TYPING_IN_CHAT:
            return {
                ...state,
                activeChat : {
                    ...state.activeChat,
                    typingUsers: updateTypingUsers(state.activeChat.typingUsers, action.user, action.isTyping)
                }
            };
        case chatActions.SET_MESSAGES:
            return {
                ...state,
                activeChat : {
                    ...state.activeChat,
                    messages : action.messages
                }
            };
        case chatActions.SET_USERLIST:
            return {
                ...state,
                activeChat : {
                    ...state.activeChat,
                    users : state.activeChat.users
                }
            };
        default:
            return state;
    }

}


/**
 * Adds a message to messges array of a given chat
 * @param message
 * @param state
 * @param chatId
 * @returns {Array|*|T[]|string}
 */
function addMessageToChat (message, state, chatId) {
    if (state.activeChat.id === chatId) {
        return state.activeChat.messages.concat(message)
    }
}

/**
 * Updates typingUsers array of a given chat based on its length and isTyping property
 * @param typingUsers
 * @param user
 * @param isTyping
 * @returns {*}
 */
function updateTypingUsers (typingUsers, user, isTyping) {
    if(!typingUsers.length) {
        typingUsers.push(user);
        return typingUsers;
    }
    return typingUsers.filter(u => {
        if(u.id === user.id) {
            return isTyping;
        }
        return true;
    });
}
