import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../base/Input'
import * as events from '../../../events';
import {USER_CONNECTED} from "../../../events";

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error : null,
            username : null
        };
        this.signInForm = React.createRef();
    }

    static propTypes = {
        socket : PropTypes.object.isRequired,
        setUser : PropTypes.func.isRequired
    };


    componentDidMount() {
        if (window.DEBUG) {
            this.byPassLogin();
        }
    }

    /**
     * Redirect on successful login
     * @param nextProps
     */
    UNSAFE_componentWillUpdate(nextProps) {
        /* eslint-disable react/prop-types*/
        if(nextProps.authenticated) {
            this.props.history.push('/chat');
        }
        /* eslint-enable react/prop-types*/
    }


    /**
     * Sets current user or return with an error if a username is already taken
     * @param user
     * @param userExists
     */
    setUser = ({userExists, user}) => {
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


    /**
     * Emits a socket event on form submission
     * @param e
     */
    handleSubmit = (e) => {
        e.preventDefault();
        const { socket } = this.props;
        const { username } = this.state;
        socket.emit(events.VERIFY_USER, username, this.setUser);
    };


    /**
     * Bypassing login functionality for development
     */
    byPassLogin = () => {
        this.setState({username : Date.now()});
        this.handleSubmit({preventDefault : () => {}});
    };


    render() {
        return (
            <form className={'login__form'} onSubmit={this.handleSubmit} ref={this.signInForm}>
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