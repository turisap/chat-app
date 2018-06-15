import React, { Component } from 'react';

import Input from '../base/Input'
import * as events from '../../../events';
import {USER_CONNECTED} from "../../../events";

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error : null,
            username : null
        }
    }

    /**
     * Redirect on successful login
     * @param nextProps
     */
    componentWillUpdate(nextProps) {
        if(nextProps.authenticated) {
            this.props.history.push('/chat');
        }
    }

    /**
     * Sets current user or return with an error if a username is already taken
     * @param user
     * @param userExists
     */
    setUser = ({userExists, user}) => {
        // console.log(user, userExists);

        if(userExists) {
            this.setError('Username is already taken');
            return;
        }

        const { socket } = this.props;
        socket.emit(USER_CONNECTED, user);

        this.setError('');
        this.props.setUser(user);
    };

    /**
     * Sets an error property to a given string
     * @param error
     */
    setError = (error) => {
        this.setState({error})
    };


    handleSubmit = (e) => {
        e.preventDefault();
        const { socket } = this.props;
        const { username } = this.state;
        socket.emit(events.VERIFY_USER, username, this.setUser);
    };

    render() {
        return (
            <form className={'login__form'} onSubmit={this.handleSubmit}>
                <Input
                    type={"text"}
                    placeholder={"Pick up a username"}
                    error={this.state.error}
                    onChange={e => this.setState({username : e.target.value})}
                    class={'username'}
                />
            </form>
        )
    }
}

export default LoginForm;