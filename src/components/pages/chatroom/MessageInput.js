import React from 'react';
import { Input } from 'semantic-ui-react';
import uuid from 'uuid';
import moment from 'moment';

import Button  from '../../base/Button'

class MessageInput extends React.Component {

    state = {
        message : {
            id : '',
            fromMe : true,
            username : this.props.username,
            date : '',
            message : ''
        }
    };

    /*componentDidMount() {

    }

    static getDerivedStateFromProps(nextProps, prevState) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    getSnapshotBeforeUpdate(prevProps, prevState) {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }*/

    formatMessage = e => {
        const resetAndSendMsg = () => {
            this.props.addMessage(this.state.message);
            this.setState({message : {
                    ...this.state.message,
                    message : ''
                }})
        };

        if (e.type === 'click') {
            this.setState({message : {
                    ...this.state.message,
                    id : uuid(),
                    date : moment().format('LT')
                }});
            resetAndSendMsg();
            return;
        } else if (e.keyCode === 13) {
            resetAndSendMsg();
            return;
        }
        this.setState({message : {
                ...this.state.message,
                id : uuid(),
                date : moment().format('LT'),
                message : e.target.value,
            }});
    }

    render() {
        return(
            <div className="input__box">
                <Input
                    onChange={this.formatMessage}
                    onKeyDown={this.formatMessage}
                    value={this.state.message.message}
                />
                <Button title="Send" buttonClickHandler={this.formatMessage}/>
            </div>
        )
    }
}

export default MessageInput;