package com.manager.backend.controller;

import com.manager.backend.entity.Password;
import com.manager.backend.service.PasswordService;
import com.manager.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/passwords")
public class PasswordController {

    private final PasswordService passwordService;
    private final UserService userService;

    @Autowired
    public PasswordController(PasswordService passwordService, UserService userService) {
        this.passwordService = passwordService;
        this.userService = userService;
    }

    @GetMapping
    public List<Password> getPasswords(@AuthenticationPrincipal UserDetails userDetails) {
        Long userId = getUserIdFromUserDetails(userDetails);
        return passwordService.getPasswordsByUserId(userId);
    }

    private Long getUserIdFromUserDetails(UserDetails userDetails) {
        String email = userDetails.getUsername();
        return userService.findUserIdByEmail(email);
    }

    @PostMapping
    public ResponseEntity<Password> createPassword(@RequestBody Password password) {
        Password newPassword = passwordService.addPassword(password);
        return ResponseEntity.ok(newPassword);
    }
}