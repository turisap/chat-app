import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Home from './pages/home';
import NavBar from './base/NavBar';
import { ChatReduxContainer } from '../containers/ChatContainer';
import LoginForm from "./pages/auth/LoginForm";

export default class Router extends React.Component {
     render() {
        return(
            <BrowserRouter>
                <React.Fragment>
                    <NavBar/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/chat" component={ChatReduxContainer}/>
                    </Switch>
                </React.Fragment>
            </BrowserRouter>
        )
    }
}