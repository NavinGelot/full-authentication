import React from "react";
import {connect} from "react-redux";
import {Table} from "react-bootstrap";
import {getTasks} from "../../action/taskActions";


class TaskList extends React.Component {

    componentDidMount() {
        this.props.dispatch(getTasks());
    }

    render() {
        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#ID</th>
                    <th>Task</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.taskList && this.props.taskList.map( (task, index) => <tr key={index}>
                        <td>{task.id}</td>
                        <td>{task.taskName}</td>
                    </tr>)
                }
                </tbody>
            </Table>
        );
    }

}

let mapStateToProps = (state) => {
    return {
        taskList : state.task.taskList
    }
};

export default connect(mapStateToProps)(TaskList);