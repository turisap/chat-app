import React from 'react';
import { connect } from 'react-redux';
import {addMessage} from '../actions/chatActions';

import Chat from '../components/pages/chatroom/Chat';


const mapStateToProps = (state, ownProps) => ({
    messages : state.chatData.messages,
    username : state.userData.username,
});

const mapDispatchToProps = dispatch => ({
    addMessage : message => dispatch(addMessage(message)),
});

const ChatReduxContainer = connect(mapStateToProps, mapDispatchToProps)(Chat);

export { ChatReduxContainer };


