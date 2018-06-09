/*import React from 'react';
import propTypes from 'prop-types';

import Message from './Message';



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
};*/

import React, { Component } from 'react';

export default class Messages extends Component {
    constructor(props) {
        super(props);

        this.scrollDown = this.scrollDown.bind(this)
    }

    scrollDown(){
        const { container } = this.refs
        container.scrollTop = container.scrollHeight
    }

    componentDidMount() {
        this.scrollDown()
    }

    componentDidUpdate(prevProps, prevState) {
        this.scrollDown()
    }

    render() {
        const { messages, user, typingUsers } = this.props
        return (
            <div ref='container'
                 className="thread-container">
                <div className="thread">
                    {
                        messages.map((mes)=>{
                            return (
                                <div
                                    key={mes.id}
                                    className={`message-container ${mes.sender === user.name && 'right'}`}
                                >
                                    <div className="time">{mes.time}</div>
                                    <div className="data">
                                        <div className="message">{mes.message}</div>
                                        <div className="name">{mes.sender}</div>
                                    </div>
                                </div>

                            )
                        })
                    }
                    {
                        typingUsers.map((name)=>{
                            return (
                                <div key={name} className="typing-user">
                                    {`${name} is typing . . .`}
                                </div>
                            )
                        })
                    }
                </div>


            </div>
        );
    }
}
