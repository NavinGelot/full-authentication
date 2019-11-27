import React from "react";
import {Link} from "react-router-dom";
import './login.css'
import {performLogin} from "../../action/authentication";
import {connect} from "react-redux";

class Login extends React.Component {

    state = {
        username: "",
        password: ""
    };

    setField = (e, field) => {
        let obj = Object.assign({}, this.state);
        obj[field] = e.target.value;
        this.setState(obj);
    };

    onLogin = () => {
        this.props.dispatch(performLogin(this.state.username, this.state.password));
    };

    render() {
        return (
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
        );
    }
}


export default connect()(Login);