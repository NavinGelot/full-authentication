import React from "react";
import {addTask, closeTaskMessages} from "../../action/taskActions";
import {connect} from "react-redux";
import {Alert} from "react-bootstrap";


class AddTask extends React.Component {

    state = {
        taskName: ""
    };

    setField = (e, field) => {
        let obj = Object.assign({}, this.state);
        obj[field] = e.target.value;
        this.setState(obj);
    };

    saveTask = () => {
        this.props.dispatch(addTask(this.state.taskName));
    };

    componentWillUnmount() {
        this.props.dispatch(closeTaskMessages());
    }

    render() {
        return (
            <div>
                {
                    this.props.message &&
                        <Alert key="addTaskMessage" onClose={() => this.props.dispatch(closeTaskMessages())} variant={this.props.messageType} dismissible>
                            {this.props.message}
                        </Alert>
                }
                <div className="container login-form">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Add Task</h3>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key"/></span>
                                        </div>
                                        <input type="text" onChange={e => this.setField(e, "taskName")}
                                               className="form-control" placeholder="task name"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="button" onClick={this.saveTask}
                                               value="Save Task" className="btn float-right login_btn"/>
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
        message: state.task.message,
        messageType: state.task.messageType
    }
};

export default connect(mapStateToProps)(AddTask);