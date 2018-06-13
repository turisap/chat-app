import React from 'react';
import io from 'socket.io-client';

import Messages from './Messages';
import MessageInput from './MessageInput';
import SideBar from './SideBar';
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
        let socket;

        if (!this.props.socket) {
            socket = this.initSocket();
            this.props.setSocket(socket);
        }
        if (!this.props.activeChat) {
            const newChat = factories.createChat({name});
            this.props.setActiveChat(newChat);
            this.createChat(newChat, socket);
        }
    };


    /**
     * Initialize socket connection
     * @returns {*}
     */
    initSocket = () => {
        const socket = io(config.socketio.socketURL);
        socket.on('connect', () => console.log('CONNECTED'));
        return socket;
    };



    /**
     * Logs a current client from a given chat
     * @param chatId
     */
    logoutFromChat = (chatId) => {
        const { socket } = this.props;
        socket.emit(LOGOUT, chatId);
        this.props.logOutUserFromChat(chatId);
    };


    /**
     * Sends a message to a particular chat
     * @param chatId
     * @param message
     */
    sendMessageToChat = (chatId, message) => {
        const { socket } = this.props;
        socket.emit(MESSAGE_SENT, {chatId, message});
    };

    /**
     * Sends a typing event to a chat
     * @param chatId
     * @param isTyping
     */
    sendTypingToChat = (chatId, isTyping) => {
        const { socket } = this.props;
        socket.emit(TYPING, {chatId, isTyping})
    };


    addMessageToChat = (chatId) => {
        return message => {
            this.props.addMessageToChat(chatId, message);
        }
    };

    /**
     * Creates a new chat and assigns events to it
     * @param newChat
     * @param socket
     */
    createChat = (newChat, socket) => {
        console.log(`Socket : ${socket}`);
        const messageEvent = `${MESSAGE_RECEIVED}-${newChat.id}`;
        const typingEvent = `${TYPING}-${newChat.id}`;

        socket.on(messageEvent, this.addMessageToChat(newChat.id))
    };


    render () {
        const { activeChat } = this.props;
        return (
            <React.Fragment>
                {
                    activeChat &&
                        <div>
                            <SideBar/>
                            <div className="chat__mainContainer">
                                <div className="chatBox__container">
                                    <ChatHeading />
                                    <Messages
                                        messages={activeChat.messages}
                                    />
                                    <MessageInput
                                        logoutFromChat={this.logoutFromChat}
                                        sendMessageToChat={message => this.sendMessageToChat(activeChat.id, message)}
                                        sendTypingToChat={isTyping => this.sendTypingToChat(activeChat.id, isTyping)}
                                    />
                                </div>
                            </div>
                        </div>

                }
            </React.Fragment>
        )
    }
}

export default ChatSocketContainer;