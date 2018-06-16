import React from 'react';
import {NavLink} from 'react-router-dom';
/* eslint-disable no-unused-vars */
const NavBar = props => (
    <nav>
        <NavLink to="/" activeClassName='navlink__active'>Home</NavLink>
        <NavLink to="/chat" activeClassName='navlink__active'>Chat</NavLink>
    </nav>
);

export default NavBar;
