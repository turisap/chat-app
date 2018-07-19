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
    <div className={classNames('message', {'message--from_me' : fromMe})}>
        <div className={"message__senderm"}>
            <div className="message__username">{sender}</div>
            <div className="message__date">{time}</div>
        </div>
        <div className="message__text">{message}</div>
    </div>
);


Message.propTypes = {
    fromMe : propTypes.bool.isRequired,
    sender : propTypes.string.isRequired,
    timeStamp   : propTypes.number.isRequired,
    time : propTypes.string.isRequired,
    message    : propTypes.string.isRequired

};

export default Message;