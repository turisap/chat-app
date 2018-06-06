import { messages } from '../fakedata/chat';
import * as actions from '../actions/types';


const eventReducerDefaultState = {
    messages : messages(5),
};

export default (state=eventReducerDefaultState, action) => {
    switch(action.type) {
        case actions.ADD_CHAT_MESSAGE:
            return {
                ...state,
                messages : state.messages.concat(action.message)
            };
            break;
        default:
            return state;
    }

}