import React from 'react';
import propTypes from 'prop-types';

import Message from './Message';



class Messages  extends React.Component {

    constructor(props) {
        super(props);
        this.messageContainer = React.createRef();
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


    componentDidUpdate = () => {
        this.scrollOnMount();
    };


    render(){
        const { typingUsers, messages, user} = this.props;
        return (
            <React.Fragment>
                <div className="messages__container" ref={this.messageContainer}>
                    {messages.length && messages.map((m,i)=> {
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
                    <div>
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
    }).isRequired
};

export default Messages;


