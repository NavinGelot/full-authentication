package com.main.rest.controller;

import com.main.auth.domain.User;
import com.main.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping(value = "/api")
public class UserInformation {

    @Autowired
    private UserRepository userRepository;

    /**
     * only admin role can access this end-point not user
     * to do that authorization token should be of admin login
     */
    @GetMapping("/admin-access")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public User getUserNameViaAdminAccess(@RequestParam Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null);
    }

    /**
     * only user role can access this end-point not admin;
     * to do that authorization token should be of user login
     */
    @GetMapping("/user-access")
    @PreAuthorize("hasRole('ROLE_USER')")
    public User getUserNameViaUserAccess(@RequestParam Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null);
    }

    /**
     * defining all roles or not will not make any sense as not defining any role will
     * execute method
     */

    @GetMapping("/user-admin-access")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public User getUserNameViaUserAndAdminAccess(@RequestParam Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.orElse(null);
    }

}
