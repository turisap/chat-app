import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const SideBar = props => (
    <div className={"userlist__main"}>
        {props.userList.map(user => <div key={user.id}>{user.username}</div>)}
    </div>
);


SideBar.propTypes = {
    userList : PropTypes.array.isRequired
};


const mapStateToProps = state => ({
    userList : state.chatData.activeChat.users
});

const reduxSideBar = connect(mapStateToProps, null)(SideBar);

export default reduxSideBar;