import React from 'react';
import propTypes from 'prop-types';

import Message from './Message';



const Messages = props => {
    const { typingUsers, messages, user, } = props;
    return (
        <React.Fragment>
            <div className="messages__container">
                {messages && messages.map((m,i)=> {
                    const { time, sender, message} = m;
                    return (
                        <Message
                            fromMe={false}
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
};

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


