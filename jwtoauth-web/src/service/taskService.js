import BaseService from "./BaseService";

class TaskService extends BaseService {

    addTask(taskName) {
        let requestData = {
            task: taskName
        };

        let headers = this.commonHeader();
        headers['Content-Type'] = 'application/json';

        return fetch('http://localhost:8081/api/task', {
            headers,
            body: JSON.stringify(requestData),
            method: 'POST',
        }).then(response => response.json())
            .catch(err => {
                throw Error(err);
            })
    }

    removeTask(taskId) {
        let headers = this.commonHeader();
        headers['Content-Type'] = 'application/json';

        return fetch('http://localhost:8081/api/task?taskId=' + taskId, {
            headers,
            method: 'DELETE',
        }).then(response => response.json())
            .catch(err => {
                throw Error(err);
            })
    }

    getTasks() {
        let headers = this.commonHeader();
        headers['Content-Type'] = 'application/json';

        return fetch('http://localhost:8081/api/tasks', {
            headers,
            method: 'GET',
        }).then(response => response.json())
            .catch(err => {
                throw Error(err);
            })
    }

}

export let taskService = new TaskService();