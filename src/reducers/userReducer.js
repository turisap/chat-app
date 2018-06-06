import * as actions from "../actions/types";

const eventReducerDefaultState = {
    username : 'Turisap'
};

export default (state=eventReducerDefaultState, action) => {
    switch(action.type) {
        default:
            return state;
    }

}