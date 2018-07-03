import { connect } from 'react-redux';
import {addMessage, setSocket, getMessages, getChatUsersFromServer,
    logoutFromChat, setActiveChat, addUserToChat, updateTypingInChat, setUser} from '../actions/chatActions';

import ChatSocketContainer from '../components/pages/chatroom/ChatSocketContainer';


const mapStateToProps = (state) => ({
    messages : state.chatData.messages,
    socket   : state.chatData.socket,
    user     : state.userData.user,
    activeChat : state.chatData.activeChat,
});

const mapDispatchToProps = dispatch => ({
    addMessageToChat : (chatId, message) => dispatch(addMessage(chatId, message)),
    setSocket  : socket => dispatch(setSocket(socket)),
    setUser    : user => dispatch(setUser(user)),
    logOutUserFromChat : chatId => dispatch(logoutFromChat(chatId)),
    setActiveChat : chat => dispatch(setActiveChat(chat)),
    addUserToChat : (user, chatId) => dispatch(addUserToChat(user, chatId)),
    updateTypingInChat : (chatId, user, isTyping) => dispatch(updateTypingInChat(chatId, user, isTyping)),
    getMessagesFromServer : chatId => dispatch(getMessages(chatId)),
    getUserListFromServer : chatId => dispatch(getChatUsersFromServer(chatId))
});


const ChatReduxContainer = connect(mapStateToProps, mapDispatchToProps)(ChatSocketContainer);

export { ChatReduxContainer };


