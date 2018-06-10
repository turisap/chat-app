import * as actions from "../actions/types";

const userReducerDefaultState = {
    user : null,
    authenticated : false,
    jwtToken : null,
};

export default (state=userReducerDefaultState, action) => {
    switch(action.type) {
        case actions.SET_USER:
            return {
                ...state,
                user : action.user,
                authenticated: true
            };
        default:
            return state;
    }

}