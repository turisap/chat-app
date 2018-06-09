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

export default class MessageInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message:"",
            isTyping:false
        };

    }

    handleSubmit = (e)=>{
        e.preventDefault()
        this.sendMessage()
        this.setState({message:""})
    }

    sendMessage = () => {
        this.props.sendMessage(this.state.message)
    }

    sendTyping = ()=>{
        this.lastUpdateTime = Date.now()
        if(!this.state.isTyping){
            this.setState({isTyping:true})
            this.props.sendTyping(true)
            this.startCheckingTyping()
        }
    }

    /*
    *	startCheckingTyping
    *	Start an interval that checks if the user is typing.
    */
    startCheckingTyping = ()=>{
        console.log("Typing");
        this.typingInterval = setInterval(()=>{
            if((Date.now() - this.lastUpdateTime) > 300){
                this.setState({isTyping:false})
                this.stopCheckingTyping()
            }
        }, 300)
    }

    /*
    *	stopCheckingTyping
    *	Start the interval from checking if the user is typing.
    */
    stopCheckingTyping = ()=>{
        console.log("Stop Typing");
        if(this.typingInterval){
            clearInterval(this.typingInterval)
            this.props.sendTyping(false)
        }
    }


    render() {
        const { message } = this.state
        return (
            <div className="message-input">
                <form
                    onSubmit={ this.handleSubmit }
                    className="message-form">

                    <input
                        id = "message"
                        ref = {"messageinput"}
                        type = "text"
                        className = "form-control"
                        value = { message }
                        autoComplete = {'off'}
                        placeholder = "Type something interesting"
                        onKeyUp = { e => { e.keyCode !== 13 && this.sendTyping() } }
                        onChange = {
                            ({target})=>{
                                this.setState({message:target.value})
                            }
                        }
                    />
                    <button
                        disabled = { message.length < 1 }
                        type = "submit"
                        className = "send"

                    > Send </button>
                </form>

            </div>
        );
    }
}