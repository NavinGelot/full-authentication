import {Cookies} from "react-cookie";
import {JWT_TOKEN_NAME} from "../app-constant/constant";

class AuthenticationService {

    performSignUp(requestData) {

        return fetch('http://localhost:8081/api/auth/signup', {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData),
            method: 'POST',
        }).then(response => {
            if (!response.ok) {
                throw Error(response.statusText)
            }
            return response;
        })
    }

    performLogout() {
        const cookies = new Cookies();
        cookies.remove(JWT_TOKEN_NAME);
    }

}

export let authenticationService = new AuthenticationService();