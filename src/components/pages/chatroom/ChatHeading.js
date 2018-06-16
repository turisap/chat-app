import React from 'react';
import PropTypes from 'prop-types';
import FAVideo from 'react-icons/lib/fa/video-camera'
import FAUserPlus from 'react-icons/lib/fa/user-plus'
import MdEllipsisMenu from 'react-icons/lib/md/keyboard-control'

const ChatHeading =  ({name}) => {
    return (
        <div className="chat-header">
            <div className="user-info">
                <div className="user-name">{name}</div>
                <div className="status">
                    <div className="indicator"></div>
                </div>
            </div>
            <div className="options">
                <FAVideo />
                <FAUserPlus />
                <MdEllipsisMenu />
            </div>
        </div>
    );

};

ChatHeading.propTypes = {
    name : PropTypes.string,
    numberOfUsers : PropTypes.string
}

export default ChatHeading;