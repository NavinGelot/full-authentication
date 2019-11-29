package com.main.auth.controller;

import com.main.auth.domain.User;
import com.main.auth.payload.ResponseDTO.ApiResponse;
import com.main.auth.repository.UserRepository;
import com.main.auth.utility.JwtTokenProvider;
import com.main.rest.payload.AuthorizationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AuthorizationController {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/checkAuthentication")
    public ApiResponse checkAuthentication(HttpServletRequest servletRequest, HttpServletResponse servletResponse) {
        String jwt = servletRequest.getHeader("Authorization");

        Long userId = jwtTokenProvider.getUserIdFromJWT(jwt.substring(7));
        AuthorizationResponse authorizationResponse = new AuthorizationResponse(true, "success");
        userRepository.findById(userId).ifPresent(user -> {
            authorizationResponse.setUsername(user.getUsername());
            authorizationResponse.setRole(user.getRoles().stream().findFirst().get().getName().name());
        });
        return authorizationResponse;
    }

}
