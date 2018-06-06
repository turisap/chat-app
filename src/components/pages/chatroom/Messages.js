import React from 'react';
import propTypes from 'prop-types';

import Message from './Message';


/**
 * This component renders a list of messages between users in a chat room
 * @param props
 * @returns {*}
 * @constructor
 */
const Messages = props => {
    return (
        <div className="messages__container">
            {props.messages.map((m, i) => <Message key={i} {...m}/>)}
        </div>
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