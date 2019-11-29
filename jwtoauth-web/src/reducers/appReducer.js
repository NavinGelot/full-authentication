import {combineReducers} from "redux";
import task from "./taskReducer";
import auth from "./authReducer";


export default combineReducers({
    task,
    auth
});