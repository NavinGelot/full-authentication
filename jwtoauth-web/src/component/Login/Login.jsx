import React from "react";
import {Link} from "react-router-dom";
import './login.css'
import {connect} from "react-redux";
import {withCookies} from "react-cookie";
import {JWT_TOKEN_NAME} from "../../app-constant/constant";
import {history} from '../../utility/history';
import {Alert} from "react-bootstrap";
import {
    UPDATE_AUTHENTICATION_STATUS,
    ADD_AUTHENTICATION_MESSAGE,
    REMOVE_AUTHENTICATION_MESSAGE
} from "../../action/actions";

class Login extends React.Component {

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {
            name: cookies.get(JWT_TOKEN_NAME),
            username: "",
            password: ""
        };
    }

    setField = (e, field) => {
        let obj = Object.assign({}, this.state);
        obj[field] = e.target.value;
        this.setState(obj);
    };

    onLogin = () => {
        const {cookies} = this.props;

        let data = {
            usernameOrEmail: this.state.username,
            password: this.state.password
        };

        fetch('http://localhost:8081/api/auth/signin', {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            method: 'POST',
        }).then(response => {
            if (response.status === 401) {
                throw Error("username or password is not valid");
            } else if (response.status === 400) {
                throw Error("username or password is empty");
            }
            return response.json();
        }).then(response => {
            this.props.dispatch({type: UPDATE_AUTHENTICATION_STATUS, currentLogin: data.usernameOrEmail});
            cookies.set(JWT_TOKEN_NAME, response.accessToken, {expires: this.getExpireTime()});
            history.push("/")
        }).catch(err => {
            console.log("inside")
            this.props.dispatch({type: ADD_AUTHENTICATION_MESSAGE, message: err.toString()})
        });
    };

    getExpireTime = () => {
        // we are expiring current user login after 5 minutes
        let expiresDate = new Date();
        let newMinutes = expiresDate.getMinutes() + 5;
        expiresDate.setMinutes(newMinutes);
        return expiresDate;
    };

    render() {

        return (
            <div>
                {
                    this.props.message &&
                    <Alert key="loginMessage" onClose={() => this.props.dispatch({type: REMOVE_AUTHENTICATION_MESSAGE})} variant={"danger"} dismissible>
                        {this.props.message}
                    </Alert>
                }
                <div className="container login-form">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Login</h3>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-user"/>
                                        </span>
                                        </div>
                                        <input type="text" onChange={e => this.setField(e, "username")}
                                               className="form-control" placeholder="username"/>

                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key"/></span>
                                        </div>
                                        <input type="password" onChange={e => this.setField(e, "password")}
                                               className="form-control" placeholder="password"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="button"
                                               onClick={this.onLogin}
                                               value="Login" className="btn float-right login_btn"/>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-center links">i
                                    Don't have an account?<Link to="/signup">Sign-up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        message: state.auth.message
    }
};

export default withCookies(connect(mapStateToProps)(Login));