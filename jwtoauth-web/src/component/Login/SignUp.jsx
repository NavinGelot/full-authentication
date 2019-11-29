import React from "react";
import './login.css'
import {performSignUp} from "../../action/authentication";
import {connect} from "react-redux";
import {Alert} from "react-bootstrap";
import {REMOVE_AUTHENTICATION_MESSAGE} from "../../action/actions";
import {closeTaskMessages} from "../../action/taskActions";

class SignUp extends React.Component {

    state = {
        name: "",
        username: "",
        password: "",
        email: ""
    };

    setField = (e, FIELD) => {
        let obj = Object.assign({}, this.state);
        obj[FIELD] = e.target.value;
        this.setState(obj);
    };

    performSignUp = () => {
        let requestData = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        };
        this.props.dispatch(performSignUp(requestData));
    };

    componentWillUnmount() {
        this.props.dispatch({type: REMOVE_AUTHENTICATION_MESSAGE})
    }

    render() {
        return (
            <div>
                {
                    this.props.message &&
                    <Alert key="signupMessage" onClose={() => this.props.dispatch({type: REMOVE_AUTHENTICATION_MESSAGE})} variant={"danger"} dismissible>
                        {this.props.message}
                    </Alert>
                }
                <div className="container">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Sign Up</h3>
                            </div>
                            <div className="card-body">
                                <form>

                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"/></span>
                                        </div>
                                        <input type="text" onChange={e => this.setField(e, "name")}
                                               className="form-control" placeholder="name"/>
                                    </div>

                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"/></span>
                                        </div>
                                        <input type="text" onChange={e => this.setField(e, "username")}
                                               className="form-control" placeholder="username"/>
                                    </div>

                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i
                                                className="fas fa-envelope-square"/></span>
                                        </div>
                                        <input type="text" onChange={e => this.setField(e, "email")}
                                               className="form-control" placeholder="email"/>
                                    </div>

                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key"/></span>
                                        </div>
                                        <input type="password" onChange={e => this.setField(e, "password")}
                                               className="form-control" placeholder="password"/>
                                    </div>

                                    <div className="form-group">
                                        <input type="button" value="SignUp" onClick={this.performSignUp}
                                               className="btn float-right login_btn"/>
                                    </div>
                                </form>
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

export default connect(mapStateToProps)(SignUp);