package com.manager.backend.service;

import com.manager.backend.dto.UserRegistrationDto;
import com.manager.backend.entity.User;
import com.manager.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
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

        if (userRepository.findByEmail(registrationDto.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists with this email");
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
    }
    public Long findUserIdByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        return userOptional.map(User::getId).orElse(null);
    }

}

