package com.manager.backend.controller;

import com.manager.backend.entity.Password;
import com.manager.backend.entity.User;
import com.manager.backend.repository.UserRepository;
import com.manager.backend.service.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/passwords")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class PasswordController {

    private final PasswordService passwordService;
    private final UserRepository userRepository;

    @Autowired
    public PasswordController(PasswordService passwordService, UserRepository userRepository) {
        this.passwordService = passwordService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<Password>> getPasswords(Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        User user = userRepository.findByEmail(email).orElseThrow();
        List<Password> passwords = passwordService.getPasswordsByUserId(user.getId());
        return ResponseEntity.ok(passwords);
    }

    @PostMapping
    public ResponseEntity<Password> addPassword(@RequestBody Password password, Authentication authentication) {
        String email = ((UserDetails) authentication.getPrincipal()).getUsername();
        User user = userRepository.findByEmail(email).orElseThrow();
        password.setUser(user);
        Password savedPassword = passwordService.savePassword(password);
        return ResponseEntity.ok(savedPassword);
    }
}
