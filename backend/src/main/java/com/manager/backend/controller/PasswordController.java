package com.manager.backend.controller;

import com.manager.backend.entity.Password;
import com.manager.backend.service.PasswordService;
import com.manager.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<?> createPassword(@RequestBody Password password, @AuthenticationPrincipal UserDetails userDetails) {        System.out.println("Received Password: " + password);

        if (password.getItemName() == null || password.getItemName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Item name is required.");
        }
        Long userId = getUserIdFromUserDetails(userDetails);
        password.setUserId(userId);
        Password newPassword = passwordService.addPassword(password);
        return ResponseEntity.ok(newPassword);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePassword(@PathVariable Long id, @RequestBody Password updatedPassword, @AuthenticationPrincipal UserDetails userDetails) {
        Long userId = getUserIdFromUserDetails(userDetails);
        if (!passwordService.userOwnsPassword(userId, id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized access");
        }
        updatedPassword.setUserId(userId);
        Password modifiedPassword = passwordService.updatePassword(id, updatedPassword);
        return ResponseEntity.ok(modifiedPassword);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePassword(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        Long userId = getUserIdFromUserDetails(userDetails);
        if (!passwordService.userOwnsPassword(userId, id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized access");
        }
        passwordService.deletePassword(id);
        return ResponseEntity.ok().body("{\"message\": \"Password entry deleted successfully.\"}");
    }



}