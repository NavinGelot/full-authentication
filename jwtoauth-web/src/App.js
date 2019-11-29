import React from 'react';
import './App.css';
import {withCookies} from "react-cookie";
import {connect} from "react-redux";
import {JWT_TOKEN_NAME} from "./app-constant/constant";
import {Redirect, Route, Switch} from "react-router";
import Login from "./component/Login/Login";
import SignUp from "./component/Login/SignUp";
import Task from "./component/Task/AddTask";
import {ErrorPage} from "./component/Error/error";
import RemoveTask from "./component/Task/RemoveTask";
import {Nav} from "react-bootstrap";
import {performLogout} from "./action/authentication";
import {Link} from "react-router-dom";
import {UPDATE_AUTHENTICATION_STATUS} from "./action/actions";
import TaskList from "./component/Task/TaskList";

const UnAuthenticatedUser = () => {
    return <Switch>
        <Route exact path="/login">
            <Login/>
        </Route>
        <Route exact path="/signup">
            <SignUp/>
        </Route>
        <Redirect from='*' to='/login'/>
    </Switch>
};

const AuthenticatedUser = (props) => {
    let isAdmin = props.role === "ROLE_ADMIN";
    return <Switch>
        <Route path="/add-task">
            <Task/>
        </Route>
        { // using this we will not allow user to access direct link (only admin can access from diff tab open)
            isAdmin && <Route exact path="/remove-task">
                <RemoveTask/>
            </Route>
        }
        <Route exact path="/task-list">
            <TaskList/>
        </Route>
        <Route path="/error">
            <ErrorPage/>
        </Route>
        {/* todo: for this redirect we can implement one page to indicate user that should logout*/}
        <Redirect from='/login' to='/'/>
        <Redirect from='/signup' to='/'/>
        <Redirect from='/' to='/add-task'/>
        <Redirect from='*' to='/error'/>
    </Switch>
};

class MyApplication extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            adminLinks: [
                {
                    link: "/add-task",
                    displayName: "Add Task",
                }, {
                    link: "/remove-task",
                    displayName: "Remove Task",
                }, {
                    link: "/task-list",
                    displayName: "Task List",
                }
            ],
            userLinks: [
                {
                    link: "/add-task",
                    displayName: "Add Task",
                }, {
                    link: "/task-list",
                    displayName: "Task List",
                }
            ]
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.auth.authenticationProcess !== "done")
            this.checkLoginStatus();
    }

    componentWillMount() {
        this.checkLoginStatus();
    }

    checkLoginStatus = () => {
        const {cookies} = this.props;
        let token = cookies.get(JWT_TOKEN_NAME);

        if (token) {
            fetch('http://localhost:8081/api/checkAuthentication', {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                method: 'GET',
            }).then(response => {
                if (response.status === 401) {
                    throw Error("username or password is not valid");
                }
                return response.json();
            }).then(loginResponse =>
                this.props.dispatch({
                    type: UPDATE_AUTHENTICATION_STATUS,
                    authenticationProcess: "done",
                    isAuthenticated: true,
                    currentLogin: loginResponse
                })).catch(err => {
                this.props.dispatch({
                    type: UPDATE_AUTHENTICATION_STATUS,
                    authenticationProcess: "done",
                    isAuthenticated: false,
                    currentLogin: {}
                });
            });
        } else {
            this.props.dispatch({
                type: UPDATE_AUTHENTICATION_STATUS,
                authenticationProcess: "done",
                isAuthenticated: false,
                currentLogin: {}
            })
        }
    };

    render() {
        if (this.props.auth.authenticationProcess !== "done")
            return null;

        let {currentLogin} = this.props.auth;

        return (
            !this.props.auth.isAuthenticated ?
                <UnAuthenticatedUser/>
                :
                <div>
                    <Nav variant="pills" defaultActiveKey="/home">
                        {
                            currentLogin.role === "ROLE_ADMIN" ?
                                this.state.adminLinks.map((link, index) =>
                                    <Nav.Item key={index}>
                                        <Nav.Link as={Link} to={link.link}>{link.displayName}</Nav.Link>
                                    </Nav.Item>) :
                                this.state.userLinks.map((link, index) =>
                                    <Nav.Item key={index}>
                                        <Nav.Link as={Link} to={link.link}>{link.displayName}</Nav.Link>
                                    </Nav.Item>
                                )
                        }
                        <Nav.Item>
                            <Nav.Link href="/" onSelect={() => this.props.dispatch(performLogout())}>Log out</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <AuthenticatedUser role={currentLogin.role}/>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

/**
 * withCookie will allow us to access cookie information like
 * this.props.cookie.get("name");
 */
export default withCookies(connect(mapStateToProps)(MyApplication));
