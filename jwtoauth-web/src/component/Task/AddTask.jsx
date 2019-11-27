import React from "react";


class AddTask extends React.Component {
    render() {
        return (
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
                                    <input type="password" onChange={e => this.setField(e, "password")}
                                           className="form-control" placeholder="task name"/>
                                </div>
                                <div className="form-group">
                                    <input type="button" onClick={() => alert(JSON.stringify(this.state))}
                                           value="Save Task" className="btn float-right login_btn"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddTask;