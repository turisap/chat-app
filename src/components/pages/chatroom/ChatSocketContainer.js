import React from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import UserList from './UserList';

class ChatSocketContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats : [],
            activeChat : null
        }
    }

    setActiveChat = (activeChat) => {
        this.setState({activeChat})
    }

    render () {
        const { socket, user, logout } = this.props;
        const { chats, activeChat } = this.state;
        return (
            <div className="chat__mainContainer">
                <UserList
                    socket={socket}
                    logout={logout}
                    chats={chats}
                    activeChat={activeChat}
                    setActiveChat={this.setActiveChat}
                    user={user}
                />
                <div className="chatBox__container">
                    <Messages messages={this.props.messages} socket={socket} user={user} logout={this.logout}/>
                    <MessageInput {...this.props} socket={socket} user={user} logout={this.logout}/>
                </div>
            </div>
        )
    }
}

export default ChatSocketContainer;