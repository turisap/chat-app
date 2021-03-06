import React from 'react';

import Messages from './Messages';
import MessageInput from './MessageInput';
import SideBar from './SideBar';
import ChatHeading from './ChatHeading';

const factories = require('../../../../factories');

import {MESSAGE_SENT, TYPING, MESSAGE_RECEIVED, LOGOUT, NOTIFICATION} from '../../../../events';

class ChatSocketContainer extends React.Component {
    /* eslint-disable react/prop-types */

    constructor(props) {
        super(props);
    }


    /**
     * Gets socket, user and activeChat objects and set in to Redux store on component mount
     */
    componentDidMount() {
        const {activeChat, user, socket, userlist} = this.props;

        if (!activeChat) {
            const newChat = factories.createChat({name});
            this.props.setActiveChat(newChat);
            this.createChat(newChat, socket);
        }

        if (user && activeChat) {
            this.props.addUserToChat(user, activeChat.id, socket);
            this.props.getMessagesFromServer(activeChat.id);
        }

        if(!userlist && activeChat) {
            this.props.getUserListFromServer(activeChat.id);
        }
    }


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



    /**
     * Adds a message to a particular chat
     * @param chatId
     * @returns {Function}
     */
    addMessageToChat = (chatId) => {
        return message => {
            this.props.addMessageToChat(chatId, message);
        }
    };



    /**
	*	Updates the typing of chat with id passed in.
	*	@param chatId {number}
	*/
    updateTypingInChat = (chatId) => {
        return ({isTyping, user})=>{
            this.props.updateTypingInChat(chatId, user, isTyping);
        }
    };


    /**
     * Creates a notification about new user joined
     * @param user
     * @param chatId
     */
    notifyOnNewUser = (user, chatId) => {
        this.props.notifyNewUser(user);
        this.props.getUserListFromServer(chatId);
    };



    /**
     * Creates a new chat and assigns events to it
     * @param newChat
     * @param socket
     */
    createChat = (newChat, socket) => {
        const messageEvent = `${MESSAGE_RECEIVED}-${newChat.id}`;
        const typingEvent = `${TYPING}-${newChat.id}`;
        const notificationEvent = `${NOTIFICATION}-${newChat.id}`;

        socket.on(messageEvent, this.addMessageToChat(newChat.id));
        socket.on(typingEvent, this.updateTypingInChat(newChat.id));
        socket.on(notificationEvent, user => this.notifyOnNewUser(user, newChat.id))
    };



    render () {
        const { activeChat, user, clearNewUsersFromRedux } = this.props;
        const typingUsers = activeChat ? activeChat.typingUsers : null;
        return (
            <React.Fragment>
                {
                    activeChat &&
                            <div className="chat__mainContainer">
                                <SideBar/>
                                <div className="chatBox__container">
                                    <ChatHeading />
                                    <Messages
                                        messages={activeChat.messages}
                                        user={user}
                                        typingUsers={typingUsers}
                                        newUsers={activeChat.newUsers}
                                        clearNewUsersFromRedux={clearNewUsersFromRedux}
                                    />
                                    <MessageInput
                                        logoutFromChat={this.logoutFromChat}
                                        sendMessageToChat={message => this.sendMessageToChat(activeChat.id, message)}
                                        sendTypingToChat={isTyping => this.sendTypingToChat(activeChat.id, isTyping)}
                                    />
                                </div>
                            </div>
                }
            </React.Fragment>
        )
    }
}


/* eslint-enable react/prop-types */
export default ChatSocketContainer;