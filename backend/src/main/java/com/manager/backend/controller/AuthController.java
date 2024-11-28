package com.manager.backend.controller;

import com.manager.backend.config.JwtUtil;
import com.manager.backend.dto.UserLoginDto;
import com.manager.backend.entity.User;
import com.manager.backend.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginDto loginDto, HttpServletResponse response) {
        try {
            String email = loginDto.getEmail().toLowerCase();
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, loginDto.getPassword()));
            User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

            String token = jwtUtil.generateToken(user.getEmail(), user.getId().toString());

            Cookie jwtCookie = new Cookie("jwtToken", token);
            jwtCookie.setHttpOnly(true);
            jwtCookie.setSecure(true);
            jwtCookie.setPath("/");
            jwtCookie.setAttribute("SameSite", "Strict");

            jwtCookie.setMaxAge(600); // 10 minutes

            response.addCookie(jwtCookie);

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("username", user.getName());
            responseBody.put("email", user.getEmail());

            return ResponseEntity.ok(responseBody);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        }
    }

    @GetMapping("/isAuthenticated")
    public ResponseEntity<?> isAuthenticated(HttpServletRequest request) {
        String jwt = null;

        // Retrieve token from cookies
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("jwtToken".equals(cookie.getName())) {
                    jwt = cookie.getValue();
                    break;
                }
            }
        }

        if (jwt == null || !jwtUtil.validateToken(jwt, jwtUtil.extractEmail(jwt))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("authenticated", false));
        }

        return ResponseEntity.ok(Map.of("authenticated", true));
    }


    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        Cookie cookie = new Cookie("jwtToken", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setAttribute("SameSite", "Strict");

        response.addCookie(cookie);

        return ResponseEntity.ok(new HashMap<String, String>() {{
            put("message", "Logged out successfully");
        }});
    }
}
