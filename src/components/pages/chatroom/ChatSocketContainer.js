import React from 'react';
import io from 'socket.io-client';

import Messages from './Messages';
import MessageInput from './MessageInput';
import SideBar from './SideBar';
import ChatHeading from './ChatHeading';
import config from '../../../config/chatConfig';

const factories = require('../../../../factories');

import {MESSAGE_SENT, TYPING, MESSAGE_RECEIVED, LOGOUT} from '../../../../events';

class ChatSocketContainer extends React.Component {
    /* eslint-disable react/prop-types */

    constructor(props) {
        super(props);
    }

    // static propTypes = {
    //     activeChat : propTypes.object.isRequired,
    //     user : propTypes.object.isRequired,
    //     socket : propTypes.object.isRequired,
    //     setUser : propTypes.func.isRequired,
    //     setSocket : propTypes.func.isRequired,
    //     addUserToChat : propTypes.func.isRequired,
    //     logOutUserFromChat : propTypes.func.isRequired,
    //     setActiveChat : propTypes.func.isRequired,
    //     addMessageToChat : propTypes.func.isRequired,
    //     updateTypingInChat : propTypes.func.isRequired,
    //
    // };

    /**
     * Gets socket, user and activeChat objects and set in to Redux store on component mount
     */
    componentDidMount() {
        let socket;

        const {activeChat, user} = this.props;

        if (!this.props.socket) {
            socket = this.initSocket();
            this.props.setSocket(socket);
        }
        if (!activeChat) {
            const newChat = factories.createChat({name});
            this.props.setActiveChat(newChat);
            this.createChat(newChat, socket);
        }

        if (user && activeChat) {
            this.props.addUserToChat(user);
        }
    }



    /**
     * Initialize socket connection
     * @returns {*}
     */
    initSocket = () => {
        const socket = io(config.socketio.socketURL);
        socket.on('connect', () => {});
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
     * Creates a new chat and assigns events to it
     * @param newChat
     * @param socket
     */
    createChat = (newChat, socket) => {
        const messageEvent = `${MESSAGE_RECEIVED}-${newChat.id}`;
        const typingEvent = `${TYPING}-${newChat.id}`;

        socket.on(messageEvent, this.addMessageToChat(newChat.id));
        socket.on(typingEvent, this.updateTypingInChat(newChat.id));
    };


    render () {
        const { activeChat } = this.props;
        const typingUsers = activeChat ? activeChat.typingUsers : null;
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
                                        user={this.props.user}
                                        typingUsers={typingUsers}
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
/* eslint-enable react/prop-types */
export default ChatSocketContainer;