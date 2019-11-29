import {authenticationService} from "../service/AuthenticationService";
import {history} from '../utility/history'
import {ADD_AUTHENTICATION_MESSAGE} from "./actions";

export const performSignUp = (requestData) => {
    return (dispatch) => {
        authenticationService.performSignUp(requestData).then(response => {
            history.push("/");
        }).catch(err =>
            dispatch({type: ADD_AUTHENTICATION_MESSAGE, message: err.toString()})
        )
    }
};

export const performLogout = () => {
    return (dispatch) => {
        authenticationService.performLogout()
    }
};