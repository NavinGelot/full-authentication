package com.main.rest.controller;

import com.main.auth.payload.ResponseDTO.ApiResponse;
import com.main.rest.domain.Task;
import com.main.rest.payload.TaskRequest;
import com.main.rest.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @PostMapping("/task")

    public ApiResponse addTask(@Valid @RequestBody TaskRequest taskRequest) {
        Task task = new Task();
        task.setTaskName(taskRequest.getTask());
        Task addedTask = taskRepository.save(task);
        if (addedTask != null) {
            return new ApiResponse(true, "record added successfully");
        } else {
            return new ApiResponse(false, "unable to add task");
        }

    }

    @GetMapping("/tasks")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public List<Task> getTasks() {
        return taskRepository.findAll();

    }

    @DeleteMapping("/task")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ApiResponse deleteTask(@RequestParam Long taskId) {
        if (taskRepository.findById(taskId).isPresent()) {
            taskRepository.deleteById(taskId);
            return new ApiResponse(true, "successfully deleted");
        } else {
            return new ApiResponse(false, "No such record found");
        }

    }

}
