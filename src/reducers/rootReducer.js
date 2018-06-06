/**
 * Created by HP on 23-Dec-17.
 */
import {combineReducers} from 'redux';

import ChatReducer from './chatReducer';
import UserReducer from './userReducer';


/**
 * Combines all reducers to one root one
 * @type {Reducer<S>}
 */
const rootReducer = combineReducers({
    chatData : ChatReducer,
    userData : UserReducer
});

export default rootReducer;