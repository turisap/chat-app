import React from 'react';
import propTypes from 'prop-types';

import Message from './Message';



class Messages  extends React.Component {

    constructor(props) {
        super(props);
        this.messageContainer = React.createRef();
        this.state = {
            newUsers : []
        }
    }

    /**
     * Scrolls to the bottom of container on mount and adding a message
     *
     */
    scrollOnMount = () => {
        const container = this.messageContainer.current;
        container.scrollTop = container.scrollHeight;
    };


    componentDidMount = () => {
        this.scrollOnMount();
    };


    componentDidUpdate = (prevProps) => {
        this.scrollOnMount();
        if(prevProps.newUsers.length !== this.props.newUsers.length) this.showNewUsersNotifications();
    };


    startCheckingNotificationExpire = () => {
        const newUsers = this.state.newUsers.filter(u => Date.now() - u.timeStamp < 15000);
        this.setState({newUsers});
        if (!newUsers.length) clearInterval(this.checkNotificationInterval)
    };
    

    showNewUsersNotifications = () => {
        let { newUsers } = this.props;
        const { clearNewUsersFromRedux } = this.props;
        newUsers = newUsers.concat(this.state.newUsers);
        if (newUsers.length) {
            // newUsers = newUsers.map(u => {
            //     u.timeStamp = Date.now();
            //     return u;
            // });
            this.setState({newUsers});
            clearNewUsersFromRedux();
            this.checkNotificationInterval = setInterval(() => {
                this.startCheckingNotificationExpire();
            }, 500)
        }
    };


    render(){
        const { typingUsers, messages, user} = this.props;
        const { newUsers } = this.state;
        return (
            <React.Fragment>
                <div className="messages__container" ref={this.messageContainer}>
                    <div className={'messages__container--inner'}>
                        {messages && messages.map((m,i)=> {
                            const { time, timeStamp, sender, message} = m;
                            const fromMe = sender === user.username;
                            return (
                                <Message
                                    fromMe={fromMe}
                                    sender={sender}
                                    timeStamp={timeStamp}
                                    time={time}
                                    message={message}
                                    key={i}
                                />
                            )
                        })}
                        <div  className={"messages__typing"}>
                            {
                                typingUsers && typingUsers.map(u => {
                                    if (u.id !== user.id) {
                                        return (
                                            <div key={u.id}>
                                                {`${u.username} is typing...`}
                                            </div>
                                        )
                                    }
                                })}
                        </div>
                        <div className={"messages__newuser"}>
                            {
                                newUsers && newUsers.map(user => {
                                    if (this.props.user.id !== user.id) return <div key={user.id} >{user.username} just joined the chat</div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}



Messages.propTypes = {
    messages : propTypes.arrayOf(
        propTypes.shape({
            id : propTypes.string.isRequired,
            sender : propTypes.string.isRequired,
            timeStamp : propTypes.number.isRequired,
            time : propTypes.string.isRequired,
            message : propTypes.string.isRequired
        })
    ),
    typingUsers : propTypes.array.isRequired,
    user : propTypes.shape({
        id : propTypes.string.isRequired,
        username : propTypes.string.isRequired
    }).isRequired,
    clearNewUsersFromRedux : propTypes.func.isRequired,
    newUsers : propTypes.array.isRequired
};

export default Messages;


