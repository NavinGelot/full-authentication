import {authenticationService} from "../service/AuthenticationService";


export const performLogin = (username, password) => {
    return (dispatch) => {
        authenticationService.performLogin(username, password).then(response => {
            console.log(response)
        })
    }
};

export const performSignUp = (username, password) => {
    return (dispatch) => {
        authenticationService.performSignUp(username, password).then(response => {
            console.log(response)
        })
    }
};