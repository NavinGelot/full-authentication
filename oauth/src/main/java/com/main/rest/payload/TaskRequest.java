package com.main.rest.payload;

import javax.validation.constraints.NotBlank;

public class TaskRequest {

    @NotBlank
    private String task;

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }
}
