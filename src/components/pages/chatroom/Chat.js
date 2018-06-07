import React from 'react';
import io from 'socket.io-client';

import ChatSocketContainer from './ChatSocketContainer';
import LoginForm from '../auth/LoginForm';
import ENV  from '../../../../ENV';
import { USER_CONNECTED, LOGOUT } from '../../../../events';

class Chat extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            socket: null,
            user : null
        }
    }


    componentDidMount() {
        this.initSocket();
    }


    /**
     * Initializes connection through socket
     */
    initSocket = () => {
        const socket = io(ENV.socketio.socketURL);
        socket.on('connect', () => {
            console.log('CONNECTED')
        });
        this.setState({socket});
    };


    /**
     * Sets user property to the state
     */
    setUser = user => {
        const { socket } = this.state;
        socket.emit(USER_CONNECTED, user);
        this.setState({user});
    };

    /**
     * Sets user property of the state to null
     */
    logout = () => {
        const { socket, user } = this.state;
        socket.emit(LOGOUT, user);
        this.setState({user:null})
    };

    /*static getDerivedStateFromProps(nextProps, prevState) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    getSnapshotBeforeUpdate(prevProps, prevState) {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }*/

    render() {
        const { title } = this.props;
        const { socket, user } = this.state;
        return(
            <React.Fragment>
                {
                    !user
                        ?
                        <LoginForm socket={socket} setUser={this.setUser}/>
                        :
                        <ChatSocketContainer socket={socket} user={user} logout={this.logout} messages={this.props.messages}/>

                }
            </React.Fragment>
        )
    }
}

export default Chat;