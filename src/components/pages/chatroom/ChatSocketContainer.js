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

    constructor(props) {
        super(props);
    }

    /**
     * Get socket, user and activeChat objects and set in to Redux store on component mount
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
    updateTypingInChat = (chatId) =>{
        return ({isTyping, user})=>{
            if(user !== this.props.user.username){

                const { chats } = this.props;

                let newChats = chats.map((chat)=>{
                    if(chat.id === chatId){
                        if(isTyping && !chat.typingUsers.includes(user)){
                            chat.typingUsers.push(user)
                        }else if(!isTyping && chat.typingUsers.includes(user)){
                            chat.typingUsers = chat.typingUsers.filter(u => u !== user)
                        }
                    }
                    return chat
                });
                this.setState({chats:newChats})
            }
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

        socket.on(messageEvent, this.addMessageToChat(newChat.id));
        socket.on(typingEvent, this.updateTypingInChat(newChat.id));
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
                                        user={this.props.user}
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