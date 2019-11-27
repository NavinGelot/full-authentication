import React from "react";
import './login.css'
import {performSignUp} from "../../action/authentication";
import {connect} from "react-redux";

class SignUp extends React.Component
{

    state = {
        username: "",
        password: "",
        mobileNumber: ""
    };

    setField = (e, FIELD) => {
        let obj = Object.assign({}, this.state);
        obj[FIELD] = e.target.value;
        this.setState(obj);
    };

    performSignUp = () => {
        this.props.dispatch(performSignUp(this.state.username, this.state.password));
    };

    render() {
        return (
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
                                    <input type="text" onChange={e => this.setField(e, "username")} className="form-control" placeholder="username"/>
                                </div>

                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-mobile"/></span>
                                    </div>
                                    <input type="text" value={this.state.mobileNumber} onChange={e => this.setField(e, "mobileNumber")} className="form-control" placeholder="mobile number"/>
                                </div>

                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"/></span>
                                    </div>
                                    <input type="password" onChange={e => this.setField(e, "password")} className="form-control" placeholder="password"/>
                                </div>

                                <div className="form-group">
                                    <input type="button" value="SignUp" onClick={this.performSignUp}   className="btn float-right login_btn"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(SignUp);