class AuthenticationService {

    performLogin(username, password) {
        let data = {
            username,
            password
        };
        return fetch('http://localhost:8081/users/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            method: 'POST',
        }).then(response => {
            console.log("inside then")
            response.headers.forEach(console.log)
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).catch(err => {
            throw Error(err);
        })
    }

    performSignUp(username, password) {
        let data = {
            username,
            password
        };
        return fetch('http://localhost:8081/users/sign-up', {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            method: 'POST',
        }).then(response => {
            console.log("inside then")
            if (!response.ok) {
                throw Error(response.statusText)
            }
            return response;
        }).catch(err => {
            throw Error(err);
        })
    }

}

export let authenticationService = new AuthenticationService();