import * as constants from "../action/actions";

let initialState = {
    taskList: []
};

export default function (state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case constants.ADD_TASK_MESSAGES:
            newState.message = action.message;
            if (action.isSuccessFull) {
                newState.messageType = "success";
            } else {
                newState.messageType = "danger";
            }
            return newState;

        case constants.REMOVE_TASK_MESSAGES:
            newState.message = action.message;
            if (action.isSuccessFull) {
                newState.messageType = "success";
            } else {
                newState.messageType = "danger";
            }
            return newState;

        case constants.TASK_LIST_LOADED:
            newState.taskList = action.tasks;
            return newState;

        case constants.REMOVE_TASK_MESSAGE:
            delete newState.message;
            delete newState.messageType;
            return newState;

        default:
            return newState;
    }
}