import React from 'react';
import propTypes from 'prop-types';

import Message from './Message';



const Messages = props => {
    return (
        <div className="messages__container">
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


