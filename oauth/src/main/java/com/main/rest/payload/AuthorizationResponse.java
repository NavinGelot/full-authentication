package com.main.rest.payload;

import com.main.auth.payload.ResponseDTO.ApiResponse;

public class AuthorizationResponse extends ApiResponse {

    public AuthorizationResponse(Boolean success, String message) {
        super(success, message);
    }

    private String username;

    private String role;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
