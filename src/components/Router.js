import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import NavBar from './base/NavBar';
import RequireAuth from './auth/RequireAuth';

import { ChatReduxContainer } from '../containers/ChatContainer';
import { SignInFormReduxContainer } from '../containers/SigInFormContainer';
import io from "socket.io-client";
import config from "../config/chatConfig";

export default class Router extends React.Component {
    /* eslint-disable react/prop-types */

    /**
     * Application initializing andk subscriptions
     */
    componentDidMount() {
        if (!this.props.socket) {
            const socket = io(config.socketio.socketURL);
            socket.on('connect', () => {this.props.setSocket(socket)});
        }
    }
    /* eslint-enable react/prop-types */



     render() {
         const jsx = (<BrowserRouter>
             <React.Fragment>
                 <NavBar/>
                 <Switch>
                     <Route path="/chat" component={RequireAuth(ChatReduxContainer)}/>
                     <Route path="/signin" component={SignInFormReduxContainer}/>
                 </Switch>
             </React.Fragment>
         </BrowserRouter>)

         return(
             this.props.socket ? jsx : ''
         )
     }
}