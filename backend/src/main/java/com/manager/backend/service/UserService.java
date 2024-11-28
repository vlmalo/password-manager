package com.manager.backend.service;

import com.manager.backend.dto.UserRegistrationDto;
import com.manager.backend.entity.User;
import com.manager.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final Pattern LETTER_PATTERN = Pattern.compile("[A-Za-z]");
    private static final Pattern NUMBER_PATTERN = Pattern.compile("[0-9]");
    private static final Pattern SPECIAL_CHAR_PATTERN = Pattern.compile("[!@#$%^&*]");


    public User registerUser(UserRegistrationDto registrationDto) {
        validatePassword(registrationDto.getPassword());

        String email = registrationDto.getEmail().toLowerCase();

        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email is already in use.");
        }

        // Create new user
        User user = new User();
        user.setName(registrationDto.getName());
        user.setEmail(registrationDto.getEmail());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        return userRepository.save(user);
    }

    private void validatePassword(String password) {
        if (password.length() < 12) {
            throw new RuntimeException("Password must be at least 12 characters long.");
        }
        if (password.length() > 24) {
            throw new RuntimeException("Password cannot exceed 24 characters.");
        }
        if (!LETTER_PATTERN.matcher(password).find()) {
            throw new RuntimeException("Password must contain at least one letter.");
        }
        if (!NUMBER_PATTERN.matcher(password).find()) {
            throw new RuntimeException("Password must contain at least one number.");
        }
        if (!SPECIAL_CHAR_PATTERN.matcher(password).find()) {
            throw new RuntimeException("Password must contain at least one special character (!@#$%^&*).");
        }
        Pattern invalidCharPattern = Pattern.compile("[^A-Za-z0-9!@#$%^&*]");
        if (invalidCharPattern.matcher(password).find()) {
            throw new RuntimeException("Password contains invalid characters. Only letters, numbers, and !@#$%^&* are allowed.");
        }

    }
    public UUID findUserIdByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        return userOptional.map(User::getId).orElse(null);
    }

}

