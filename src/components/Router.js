import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import NavBar from './base/NavBar';
import RequireAuth from './auth/RequireAuth';

import { ChatReduxContainer } from '../containers/ChatContainer';
import { SignInFormReduxContainer } from '../containers/SigInFormContainer';

export default class Router extends React.Component {
     render() {
        return(
            <BrowserRouter>
                <React.Fragment>
                    <NavBar/>
                    <Switch>
                        <Route path="/chat" component={RequireAuth(ChatReduxContainer)}/>
                        <Route path="/signin" component={SignInFormReduxContainer}/>
                    </Switch>
                </React.Fragment>
            </BrowserRouter>
        )
    }
}