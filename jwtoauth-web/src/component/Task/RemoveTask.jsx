import React from "react";
import {connect} from "react-redux";
import {closeTaskMessages, removeTask} from "../../action/taskActions";
import {Alert} from "react-bootstrap";

// this component only permitted to admin
class RemoveTask extends React.Component {

    state = {
        taskId: ""
    };

    setField = (e, field) => {
        let obj = Object.assign({}, this.state);
        obj[field] = e.target.value;
        this.setState(obj);
    };

    removeTask = () => {
        this.props.dispatch(removeTask(this.state.taskId));
    };

    componentWillUnmount() {
        this.props.dispatch(closeTaskMessages());
    }

    render() {
        return (
            <div>
                {
                    this.props.message &&
                    <Alert key="removeTaskMessage" onClose={() => this.props.dispatch(closeTaskMessages())} variant={this.props.messageType} dismissible>
                        {this.props.message}
                    </Alert>
                }
                <div className="container login-form">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card">
                            <div className="card-header">
                                <h3>Remove Task</h3>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key"/></span>
                                        </div>
                                        <input type="text" onChange={e => this.setField(e, "taskId")}
                                               className="form-control" placeholder="task id"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="button" onClick={this.removeTask}
                                               value="Remove Task" className="btn float-right login_btn"/>
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

export default connect(mapStateToProps)(RemoveTask);