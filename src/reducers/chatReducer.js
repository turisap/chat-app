import { messages } from '../fakedata/chat';
import * as chatActions from '../actions/types';


const chatReducerDefaultState = {
    messages : messages(5),
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
        case chatActions.LOGOUT_FROM_CHAT:
            return {
                ...state,
                chats : state.chats.filter(chat => action.chatId !== chat.id)
            };
        default:
            return state;
    }

}


function addMessageToChat (message, state, chatId) {
    if (state.activeChat.id === chatId) {
        return state.activeChat.messages.concat(message)
    }
}