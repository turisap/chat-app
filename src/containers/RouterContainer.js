import Router from '../components/Router';
import { connect } from 'react-redux';

import { setSocket } from '../actions/chatActions';

const mapDispatchToProps = (dispatch) => ({
    setSocket : socket => dispatch(setSocket(socket)),
});

const mapStateToProps = (state) => ({
    socket : state.chatData.socket
});

const ReactReduxContainer = connect(mapStateToProps, mapDispatchToProps)(Router);

export default ReactReduxContainer;
