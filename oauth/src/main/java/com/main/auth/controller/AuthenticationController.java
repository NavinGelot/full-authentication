package com.main.auth.controller;

import com.main.auth.domain.Role;
import com.main.auth.domain.RoleName;
import com.main.auth.domain.User;
import com.main.auth.payload.ResponseDTO.ApiResponse;
import com.main.auth.payload.ResponseDTO.JwtAuthenticationResponse;
import com.main.auth.payload.exception.AppException;
import com.main.auth.payload.requestDTO.LoginDTO;
import com.main.auth.payload.requestDTO.SignUpDTO;
import com.main.auth.repository.RoleRepository;
import com.main.auth.repository.UserRepository;
import com.main.auth.utility.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.time.Instant;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginDTO loginDTO) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getUsernameOrEmail(),
                        loginDTO.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpDTO signUpDTO) {
        return register(signUpDTO, RoleName.ROLE_USER);
    }

    @PostMapping("/signup-admin")
    public ResponseEntity<?> registerAdmin(@Valid @RequestBody SignUpDTO signUpDTO) {
        return register(signUpDTO, RoleName.ROLE_ADMIN);
    }

    // responsible for creating account based on given payload and role
    private ResponseEntity<?> register(SignUpDTO signUpDTO, RoleName roleName) {
        if (userRepository.existsByUsername(signUpDTO.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(signUpDTO.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        User user = new User(signUpDTO.getName(), signUpDTO.getUsername(),
                signUpDTO.getEmail(), signUpDTO.getPassword());

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName(roleName)
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));

        user.setCreatedAt(Instant.now());
        user.setUpdatedAt(Instant.now());
        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }


}
