import React from 'react';

import {VERIFY_USER} from '../../../../events';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname : "",
            error : ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { socket } = this.props;
        const { nickname } = this.state;
        socket.emit(VERIFY_USER, nickname, this.setUser);
    };


    handleChange = (e) => {
        this.setState({nickname : e.target.value});
    };


    setUser = ({user, isUser}) => {
        //console.log(user);
        if (isUser) this.setError('This username is in use');
        else {
            this.setError("");
            this.props.setUser(user);
        }
    }


    setError = (error) => {
        this.setState({error})
    }


    render() {
        const {nickname, error} = this.state;
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit} className="login__form">
                    <label htmlFor="nickname">
                        <h2>Got a nickname</h2>
                    </label>
                    <input
                        ref={input => this.textInput = input}
                        type="text"
                        value={nickname}
                        id="nickname"
                        placeholder="My awesome nickname"
                        onChange={this.handleChange}
                    />
                    <div className="error">{error ? this.state.error : ''}</div>
                </form>
            </div>
        )
    }
}

export default LoginForm;