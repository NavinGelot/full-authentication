import * as constants from "../action/actions";

let initialState = {
    authenticationProcess: "initializing",
    isAuthenticated: false
};

export default function (state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case constants.UPDATE_AUTHENTICATION_STATUS:
            newState.authenticationProcess = action.authenticationProcess;
            newState.isAuthenticated = action.isAuthenticated;
            newState.currentLogin = action.currentLogin;
            if (Object.entries(newState.currentLogin).length !== 0) {
                delete newState.currentLogin.success;
                delete newState.currentLogin.message;
            }
            return newState;

        case constants.ADD_AUTHENTICATION_MESSAGE:
            newState.message = action.message;
            return newState;

        case constants.REMOVE_AUTHENTICATION_MESSAGE:
            delete newState.message;
            return newState;

        default:
            return newState;
    }
}