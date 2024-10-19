package com.manager.backend.controller;

import com.manager.backend.config.JwtUtil;
import com.manager.backend.dto.AuthRequest;
import com.manager.backend.dto.AuthResponse;
import com.manager.backend.entity.User;
import com.manager.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
            User user = userRepository.findByEmail(authRequest.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
            String token = jwtUtil.generateToken(authRequest.getEmail(), user.getEmail()); // Pass email to generateToken

            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("username", user.getName());
            response.put("email", user.getEmail());

            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        }
    }
}