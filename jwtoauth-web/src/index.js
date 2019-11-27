import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {Provider} from "react-redux";
import {BrowserRouter, Route} from "react-router-dom";
import appReducer from "./reducers/appReducer";
import {CookiesProvider} from "react-cookie";
import Task from "./component/Task/AddTask";
import SignUp from "./component/Login/SignUp";
import Login from "./component/Login/Login";
import MyDefaultApp from "./App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <MyDefaultApp/>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/task" component={Task}/>
                </div>
            </BrowserRouter>
        </Provider>
    </CookiesProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
