import React from 'react';
import classNames from 'classnames';
import propTypes from 'prop-types';


/**
 * This component renders a single message in the Messages component
 * @param props
 * @returns {*}
 * @constructor
 */
const Message = ({fromMe, sender, time, message}) => (
    <div className={classNames('message', {'from_me' : fromMe})}>
        <div className="message__username">{sender}</div>
        <div className="message__date">{time}</div>
        <div className="message__text">{message}</div>
    </div>
);


/*Message.propTypes = {
    fromMe : propTypes.bool.isRequired,
    username : propTypes.string.isRequired,
    date    : propTypes.string.isRequired,
    message    : propTypes.string.isRequired

};*/

export default Message;