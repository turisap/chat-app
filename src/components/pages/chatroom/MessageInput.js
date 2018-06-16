// // import React from 'react';
// // import { Input } from 'semantic-ui-react';
// // import uuid from 'uuid';
// // import moment from 'moment';
// //
// // import Button  from '../../base/Button'
//
// class MessageInput extends React.Component {
//
//     state = {
//         message : {
//             id : '',
//             fromMe : true,
//             username : this.props.username,
//             date : '',
//             message : ''
//         }
//     };
//
//     componentDidMount() {
//
//     }
//
//     static getDerivedStateFromProps(nextProps, prevState) {
//
//     }
//
//     shouldComponentUpdate(nextProps, nextState) {
//
//     }
//
//     getSnapshotBeforeUpdate(prevProps, prevState) {
//
//     }
//
//     componentDidUpdate(prevProps, prevState, snapshot) {
//
//     }
//
//      formatMessage = e => {
//         const resetAndSendMsg = () => {
//             this.props.addMessage(this.state.message);
//             this.setState({message : {
//                     ...this.state.message,
//                     message : ''
//                 }})
//         };
//
//         if (e.type === 'click') {
//             this.setState({message : {
//                     ...this.state.message,
//                     id : uuid(),
//                     date : moment().format('LT')
//                 }});
//             resetAndSendMsg();
//             return;
//         } else if (e.keyCode === 13) {
//             resetAndSendMsg();
//             return;
//         }
//         this.setState({message : {
//                 ...this.state.message,
//                 id : uuid(),
//                 date : moment().format('LT'),
//                 message : e.target.value,
//             }});
//     }
//
//     render() {
//         return(
//             <div className="input__box">
//                 <Input
//                     onChange={this.formatMessage}
//                     onKeyDown={this.formatMessage}
//                     value={this.state.message.message}
//                 />
//                 <Button title="Send" buttonClickHandler={this.formatMessage}/>
//             </div>
//         )
//     }
// }
//
// export default MessageInput;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../base/Button';

class MessageInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message : '',
            isTyping : false
        }
    }

    static propTypes = {
        sendMessageToChat : PropTypes.func.isRequired,
        sendTypingToChat : PropTypes.func.isRequired,
    };

    /**
     * Stops typing event if component is going to unmount
     */
    componentWillUnmount() {
        this.stopCheckingTyping();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.sendMessage();
        this.setState({message: ''});
    };

    /**
     * Send a message to a particular chat
     */
    sendMessage = () => {
        this.props.sendMessageToChat(this.state.message);
    };

    /**
     * Sets interval for checking whether or not a user is typing
     */
    startCheckingTyping = () => {
        this.typingInterval = setInterval(() => {
            if((Date.now() - this.lastUpdateTime) > 300){
                this.setState({isTyping : false});
                this.stopCheckingTyping();
            }
        }, 3300)
    };

    /**
     * Clears interval for checking typing
     */
    stopCheckingTyping = () => {
        if(this.typingInterval) {
            clearInterval(this.typingInterval);
            this.props.sendTypingToChat(false);
        }
    };

    /**
     * Sets state's isTyping property to true and sends typing event to the back-end
     */
    sendTyping  = () => {
        this.lastUpdateTime = Date.now();
        if(!this.state.isTyping) {
            this.setState({isTyping : true});
            this.props.sendTypingToChat(true);
            this.startCheckingTyping();
        }
    };


    render() {
        return (
            <div className={"input__box"}>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type={'text'}
                        onChange={e => this.setState({message:e.target.value})}
                        onKeyUp={e => e.keyCode !== 13 && this.sendTyping()}
                        value={this.state.message}
                    />
                    <Button title={'SEND'} onClick={this.handleSubmit}/>
                </form>
            </div>
        );
    }
}

export default MessageInput;