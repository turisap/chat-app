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


    componentDidUpdate = (prevProps, prevState) => {
        this.scrollOnMount();
    };


    render(){
        const { typingUsers, messages, user} = this.props;
        return (
            <React.Fragment>
                <div className="messages__container" ref={this.messageContainer}>
                    {messages && messages.map((m,i)=> {
                        const { time, sender, message} = m;
                        const fromMe = sender === user.username;
                        return (
                            <Message
                                fromMe={fromMe}
                                sender={sender}
                                time={time}
                                message={message}
                                key={i}
                            />
                        )
                    })}
                </div>
                <div>
                    {/*{typingUsers && typingUsers.map(name => {*/}
                    {/*return (*/}
                    {/*<div key={name}>*/}
                    {/*{`${name} is typing...`}*/}
                    {/*</div>*/}
                    {/*)*/}
                    {/*})}*/}
                </div>
            </React.Fragment>
        )
    }
}

Messages.propTypes = {
    messages : propTypes.arrayOf(
        propTypes.shape({
            id : propTypes.string.isRequired,
            fromMe : propTypes.bool.isRequired,
            username : propTypes.string.isRequired,
            date : propTypes.string.isRequired,
            message : propTypes.string.isRequired
        })
    )
};

export default Messages;


