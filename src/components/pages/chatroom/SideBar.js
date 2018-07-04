import React from 'react';
import PropTypes from 'prop-types';


const SideBar = props => (
    <div className={"userlist__main"}>
        {props.userList.map(user => <div key={user.id}>{user.username}</div>)}
    </div>
);


SideBar.propTypes = {
    userList : PropTypes.array.isRequired
};

export default SideBar;