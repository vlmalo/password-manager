package com.manager.backend.controller;

import com.manager.backend.config.AESUtil;
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
import java.util.Optional;
import java.util.UUID;

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
    public List<Password> getPasswords(@AuthenticationPrincipal UserDetails userDetails, @RequestParam String masterPassword) {
        UUID userId = getUserIdFromUserDetails(userDetails);
        return passwordService.getPasswordsByUserId(userId, masterPassword);
    }

    private UUID getUserIdFromUserDetails(UserDetails userDetails) {
        String email = userDetails.getUsername();
        return userService.findUserIdByEmail(email);
    }

    @PostMapping
    public ResponseEntity<Password> createPassword(@RequestBody Password password, @RequestParam String masterPassword, @AuthenticationPrincipal UserDetails userDetails) {
        System.out.println("Received Password: " + password);

        if (password.getItemName() == null || password.getItemName().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        UUID userId = getUserIdFromUserDetails(userDetails);
        password.setUserId(userId);

        byte[] salt = AESUtil.generateSalt();

        Password newPassword = passwordService.addPassword(password, masterPassword, salt);
        return ResponseEntity.ok(newPassword);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Password> updatePassword(
            @PathVariable UUID id,
            @RequestBody Password updatedPassword,
            @RequestParam String masterPassword,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        System.out.println("Updating password with ID: " + id);
        UUID userId = getUserIdFromUserDetails(userDetails);

        if (!passwordService.userOwnsPassword(userId, id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        updatedPassword.setUserId(userId);
        Password modifiedPassword = passwordService.updatePassword(id, updatedPassword, masterPassword);

        return ResponseEntity.ok(modifiedPassword);
    }




    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePassword(@PathVariable UUID id, @AuthenticationPrincipal UserDetails userDetails) {
        UUID userId = getUserIdFromUserDetails(userDetails);
        if (!passwordService.userOwnsPassword(userId, id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized access");
        }
        passwordService.deletePassword(id);
        return ResponseEntity.ok().body("{\"message\": \"Password entry deleted successfully.\"}");
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getPasswordById(@PathVariable UUID id, @AuthenticationPrincipal UserDetails userDetails) {
        UUID userId = getUserIdFromUserDetails(userDetails);

        if (!passwordService.userOwnsPassword(userId, id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized access");
        }

        Optional<Password> password = passwordService.getPasswordById(id);

        return password
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }



}