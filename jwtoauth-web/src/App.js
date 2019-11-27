import React from 'react';
import './App.css';
import {Link} from "react-router-dom";

class MyDefaultApp extends React.Component {

    render() {
        return (
            <div>
                <Link to="/login">Login</Link>
                <br/>
                <Link to="/signup">Sign-up</Link>
            </div>
        );
    }
}

export default MyDefaultApp;
