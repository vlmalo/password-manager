package com.manager.backend.service;

import com.manager.backend.entity.Password;
import com.manager.backend.repository.PasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PasswordService {

    private final PasswordRepository passwordRepository;

    @Autowired
    public PasswordService(PasswordRepository passwordRepository) {
        this.passwordRepository = passwordRepository;
    }

    public List<Password> getPasswordsByUserId(Long userId) {
        return passwordRepository.findByUserId(userId);
    }

    public List<Password> getAllPasswords() {
        return passwordRepository.findAll();
    }

    public Password addPassword(Password password) {
        return passwordRepository.save(password);
    }

    public Password updatePassword(Long passwordId, Password updatedPassword) {
        // Ensure that the password exists before updating
        if (!passwordRepository.existsById(passwordId)) {
            throw new RuntimeException("Password not found");
        }
        updatedPassword.setId(passwordId);
        return passwordRepository.save(updatedPassword);
    }

    public void deletePassword(Long passwordId) {
        passwordRepository.deleteById(passwordId);
    }

    public boolean userOwnsPassword(Long userId, Long passwordId) {
        Optional<Password> password = passwordRepository.findById(passwordId);
        return password.isPresent() && password.get().getUserId().equals(userId);
    }
}

