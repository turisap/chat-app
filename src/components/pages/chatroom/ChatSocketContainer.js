import React from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import UserList from './UserList';
import ChatHeading from './ChatHeading';
const factories = require('../../../../factories');

import {MESSAGE_SENT, TYPING, COMMUNITY_CHAT, MESSAGE_RECEIVED} from '../../../../events';

class ChatSocketContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats : [],
            activeChat : null
        }
    }

    componentDidMount () {
        const { socket } = this.props;
        socket.emit(COMMUNITY_CHAT, this.resetChat);
    }

    /**
     * Set a given chat as an active one
     * @param activeChat
     */
    setActiveChat = (activeChat) => {
        this.setState({activeChat})
    }

    /**
     * Sending message to a particular chat
     * @param chatId
     * @param message
     */
    sendMessage = (chatId, message) => {
        const { socket } = this.props;
        socket.emit(MESSAGE_SENT, {chatId, message});
    }

    /**
     * Sending that someone types to a particular chat
     * @param chatId
     * @param isTyping
     */
    sendTyping = (chatId, isTyping) => {
        const { socket } = this.props;
        socket.emit(TYPING, {chatId, isTyping});
    }

    resetChat = (chat) => {
        return this.addChat(chat, true);
    }

    /**
     * Resets all chats and set a given one as current or adds a given chat to a list of chats
     * @param chat
     * @param reset
     */
    addChat = (chat, reset) => {
        const { socket } = this.props;
        const { chats } = this.state;

        const newChats = reset ? [chat] : [...chats, chat];
        this.setState({chats: newChats});

        const messageEvent = `${MESSAGE_RECEIVED}-${chat.id}`;
        const typingEvent = `${TYPING}-${chat.id}`;

        socket.on(messageEvent, this.addMessageToChat(chat.id));
        socket.on(typingEvent, this.updateTypingInChat(chat.id))
    }

    addMessageToChat = chatId => {
        return message => {
            const { chats } = this.state;
            let newChats = chats.map(chat =>  {
                if(chat.id === chatId) {
                    chat.messages.push(message);
                    return chat;
                }
            })
            this.setState({chats:newChats})
        }
    }

    /*
	*	Updates the typing of chat with id passed in.
	*	@param chatId {number}
	*/
    updateTypingInChat = (chatId) =>{
        return ({isTyping, user})=>{
            if(user !== this.props.user.name){

                const { chats } = this.state

                let newChats = chats.map((chat)=>{
                    if(chat.id === chatId){
                        if(isTyping && !chat.typingUsers.includes(user)){
                            chat.typingUsers.push(user)
                        }else if(!isTyping && chat.typingUsers.includes(user)){
                            chat.typingUsers = chat.typingUsers.filter(u => u !== user)
                        }
                    }
                    return chat
                })
                this.setState({chats:newChats})
            }
        }
    }

    render () {
        const { socket, user, logout } = this.props;
        const { chats, activeChat } = this.state;
        return (
            <React.Fragment>
                <UserList
                    socket={socket}
                    logout={logout}
                    chats={chats}
                    activeChat={activeChat}
                    setActiveChat={this.setActiveChat}
                    user={user}
                />
                {
                    activeChat
                        ?
                        <div className="chat__mainContainer">
                            <div className="chatBox__container">
                                <ChatHeading name={activeChat.name}/>
                                <Messages messages={activeChat.messages}
                                          socket={socket}
                                          user={user}
                                          logout={this.logout}
                                          typingUsers={activeChat.typingUsers}
                                />
                                <MessageInput
                                    {...this.props}
                                    socket={socket}
                                    user={user}
                                    logout={this.logout}
                                    sendMessage={message => this.sendMessage(activeChat.id, message)}
                                    sendTyping={isTyping => this.sendTyping(activeChat.id, isTyping)}
                                />
                            </div>
                        </div>
                        :
                        <div className="chat-room choose">
                            <h3>Choose a chat</h3>
                        </div>
                }
            </React.Fragment>
        )
    }
}

export default ChatSocketContainer;