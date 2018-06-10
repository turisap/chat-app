import React from 'react';
import io from 'socket.io-client';

import Messages from './Messages';
import MessageInput from './MessageInput';
import UserList from './UserList';
import ChatHeading from './ChatHeading';
import config from '../../../config/chatConfig';

const factories = require('../../../../factories');

import {MESSAGE_SENT, TYPING, COMMUNITY_CHAT, MESSAGE_RECEIVED, USER_CONNECTED, LOGOUT} from '../../../../events';

class ChatSocketContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Get socket object and set in to Redux store on component mount
     */
    componentDidMount = () => {
        if (!this.props.socket) {
            const socket = this.initSocket();
            this.props.setSocket(socket);
        }
    };


    /**
     * Initialize socket connection
     * @returns {*}
     */
    initSocket = () => {
        const socket = io(config.socketio.socketURL);
        socket.on('connect', () => console.log('CONNECTED'))
        return socket;
    };



    /**
     * Logs a current client from a given chat
     * @param chatId
     */
    logoutFromChat = (chatId) => {
        const { socket } = this.props;
        socket.emit(LOGOUT, chatId);
        this.props.logoutFromChat(chatId);
    };


    render () {
        return (
            <React.Fragment>
                <UserList/>
                <div className="chat__mainContainer">
                    <div className="chatBox__container">
                        <ChatHeading />
                        <Messages/>
                        <MessageInput/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ChatSocketContainer;