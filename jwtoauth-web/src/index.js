import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import appReducer from "./reducers/appReducer";
import {CookiesProvider} from "react-cookie";
import MyApplication from "./App";
import {Router} from "react-router";
import {history} from '../src/utility/history'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <BrowserRouter>
                <Router history={history}>
                    <MyApplication/>
                </Router>
            </BrowserRouter>
        </Provider>
    </CookiesProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
