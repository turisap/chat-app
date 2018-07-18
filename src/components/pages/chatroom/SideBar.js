import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const SideBar = props => (
    <div className={"userlist__main"}>
        {props.userList.map(user => {
            return (
                <div tabIndex={1} key={user.id} className={"userlist__user"}>
                    <img key={user.id} src={"https://api.adorable.io/avatars/285/abott@adorable.png"} className={"userlist__avatar"}/>
                    <div>{user.username || 'TEST USERNAME'}</div>
                </div>
            )
        })}
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