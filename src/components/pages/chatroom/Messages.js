import React from 'react';
import propTypes from 'prop-types';

import Message from './Message';



const Messages = props => {
    const { typingUsers, messages, user } = props;
    return (
        <React.Fragment>
            {/*<div className="messages__container">*/}
                {/*{messages.map(message => <Message fromMe={false} username={user.name} date={'today'} message={message}/>)}*/}
            {/*</div>*/}
            {/*<div>*/}
                {/*{typingUsers.map(user => {*/}
                    {/*return (*/}
                        {/*<div key={name}>*/}
                            {/*{`${name} is typing...`}*/}
                        {/*</div>*/}
                    {/*)*/}
                {/*})}*/}
            {/*</div>*/}
            n
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


