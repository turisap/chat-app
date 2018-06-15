import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignInFrom from '../components/auth/SignInForm';
import {setUser} from '../actions/userActions';
import {addUserToChat} from "../actions/chatActions";

const mapStateToProps = (state, ownProps) => ({
    authenticated : state.userData.authenticated,
    user : state.userData.user,
    socket : state.chatData.socket,
});

const mapDispatchToProps = (dispatch) => ({
    setUser : user => dispatch(setUser(user)),
});

const SignInFormReduxContainer = connect(mapStateToProps, mapDispatchToProps)(SignInFrom);

export { SignInFormReduxContainer };