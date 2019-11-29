import {taskService} from "../service/taskService";
import {ADD_TASK_MESSAGES, REMOVE_TASK_MESSAGES, REMOVE_TASK_MESSAGE, TASK_LIST_LOADED} from "./actions";


export const addTask = (taskName) => {

    return (dispatch) => {
        taskService.addTask(taskName).then(response => {
            dispatch({type: ADD_TASK_MESSAGES, message: response.message, isSuccessFull: response.success});
            dispatch(getTasks());
        })
    };

};

export const removeTask = (taskId) => {

    return (dispatch) => {
        taskService.removeTask(taskId).then(response => {
            dispatch({type: REMOVE_TASK_MESSAGES, message: response.message, isSuccessFull: response.success});
            dispatch(getTasks());
        })
    };

};

export const getTasks = () => {

    return (dispatch) => {
        taskService.getTasks().then(response => {
            dispatch({type: TASK_LIST_LOADED, tasks: response});
        })
    };

};

export const closeTaskMessages = () => {

    return (dispatch) => {
        dispatch({type: REMOVE_TASK_MESSAGE});
    };

};