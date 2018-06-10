import React from 'react';
import { connect } from 'react-redux';
import {addMessage, setSocket, setUser, logoutFromChat} from '../actions/chatActions';

import ChatSocketContainer from '../components/pages/chatroom/ChatSocketContainer';


const mapStateToProps = (state, ownProps) => ({
    messages : state.chatData.messages,
    socket   : state.chatData.socket,
    user     : state.chatData.user,
});

const mapDispatchToProps = dispatch => ({
    addMessage : message => dispatch(addMessage(message)),
    setSocket  : socket => dispatch(setSocket(socket)),
    setUser    : user => dispatch(setUser(user)),
    logOutUserFromChat : chatId => dispatch(logoutFromChat(chatId)),
});


const ChatReduxContainer = connect(mapStateToProps, mapDispatchToProps)(ChatSocketContainer);

export { ChatReduxContainer };


