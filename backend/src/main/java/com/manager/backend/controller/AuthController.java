package com.manager.backend.controller;

import com.manager.backend.config.JwtUtil;
import com.manager.backend.dto.UserLoginDto;
import com.manager.backend.entity.User;
import com.manager.backend.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginDto loginDto) {
        try {
            String email = loginDto.getEmail().toLowerCase();
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, loginDto.getPassword()));
            User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

            // Generate token using old method
            String token = jwtUtil.generateToken(user.getEmail(), user.getEmail());

            // Return token in the response body
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("username", user.getName());
            response.put("email", user.getEmail());

            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        }
    }



    private String createRefreshTokenCookie(String refreshToken) {
        return "refreshToken=" + refreshToken + "; HttpOnly; Secure; Path=/; Max-Age=" + (60 * 60 * 24 * 7); // 7 days
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@CookieValue(value = "refreshToken", defaultValue = "") String refreshToken) {
        if (refreshToken.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Refresh token is missing"));
        }

        try {
            String email = jwtUtil.extractEmail(refreshToken);
            String newAccessToken = jwtUtil.generateToken(email, email); // generate new access token (JWT)

            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", newAccessToken);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Invalid refresh token"));
        }
    }
}
