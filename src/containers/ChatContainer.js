import React from 'react';
import { connect } from 'react-redux';
import {addMessage, setSocket, setUser, logoutFromChat, setActiveChat, addUserToChat} from '../actions/chatActions';

import ChatSocketContainer from '../components/pages/chatroom/ChatSocketContainer';


const mapStateToProps = (state, ownProps) => ({
    messages : state.chatData.messages,
    socket   : state.chatData.socket,
    user     : state.userData.user,
    activeChat : state.chatData.activeChat
});

const mapDispatchToProps = dispatch => ({
    addMessageToChat : (chatId, message) => dispatch(addMessage(chatId, message)),
    setSocket  : socket => dispatch(setSocket(socket)),
    setUser    : user => dispatch(setUser(user)),
    logOutUserFromChat : chatId => dispatch(logoutFromChat(chatId)),
    setActiveChat : chat => dispatch(setActiveChat(chat)),
    addUserToChat : user => dispatch(addUserToChat(user))
});


const ChatReduxContainer = connect(mapStateToProps, mapDispatchToProps)(ChatSocketContainer);

export { ChatReduxContainer };


