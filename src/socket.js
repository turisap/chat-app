import io from 'socket.io-client'
import config from './config';
import events from '../../events'

const socketUrl = config.NODE_SOCKET_URL + ":" + config.NODE_PORT;

export default () => {
    const socket = io(socketUrl)

    const init = () => {

        socket.on('connect', () => {
            console.log("Connected");
        })

        //this.setState({socket})
    }

    const testEmit = () => {
        socket.emit(events.TEST_EMIT, {hello: "server"});
    }

    return {
        init,
        testEmit
    }
};