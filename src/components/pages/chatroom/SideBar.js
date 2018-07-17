import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const SideBar = props => (
    <div className={"userlist__main"}>
        {props.userList.map(user => {
            return (
                <React.Fragment key={user.id}>
                    <img key={user.id} src={"https://api.adorable.io/avatars/285/abott@adorable.png"}/>
                    <div tabIndex={1} key={user.id} className={"userlist__user"}>{user.username || 'TEST USERNAME'}</div>
                </React.Fragment>
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