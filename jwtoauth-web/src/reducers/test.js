import * as constants from "../action/actions";

var initialState = {};

export default function (state = initialState,action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case constants.UPDATE_LOGIN_STATUS:
            newState.isLogIn = "SUCCESS";
            return newState;
        default:
            return newState;
    }
}