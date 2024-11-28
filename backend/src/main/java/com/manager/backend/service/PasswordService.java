package com.manager.backend.service;

import com.manager.backend.config.AESUtil;
import com.manager.backend.entity.Password;
import com.manager.backend.repository.PasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordService {

    private final PasswordRepository passwordRepository;

    @Autowired
    public PasswordService(PasswordRepository passwordRepository) {
        this.passwordRepository = passwordRepository;
    }

    public List<Password> getPasswordsByUserId(UUID userId, String masterPassword) {
        List<Password> passwords = passwordRepository.findByUserId(userId);
        for (Password password : passwords) {
            try {
                SecretKey secretKey = AESUtil.deriveKey(masterPassword, password.getSalt());
                String decryptedPassword = AESUtil.decrypt(password.getPassword(), secretKey);
                password.setPassword(decryptedPassword);
            } catch (Exception e) {
                throw new RuntimeException("Decryption failed", e);
            }
        }
        return passwords;
    }


    public Optional<Password> getPasswordById(UUID id) {
        return passwordRepository.findById(id);
    }



    public Password addPassword(Password password, String masterPassword, byte[] salt) {
        try {
            SecretKey secretKey = AESUtil.deriveKey(masterPassword, salt);
            String encryptedPassword = AESUtil.encrypt(password.getPassword(), secretKey);
            password.setPassword(encryptedPassword);
            password.setSalt(salt);
        } catch (Exception e) {
            throw new RuntimeException("Encryption failed", e);
        }
        return passwordRepository.save(password);
    }


    public Password updatePassword(UUID passwordId, Password updatedPassword, String masterPassword) {
        // Fetch existing password entry
        Password existingPassword = passwordRepository.findById(passwordId)
                .orElseThrow(() -> new RuntimeException("Password not found"));

        byte[] salt = existingPassword.getSalt();
        if (salt == null || salt.length == 0) {
            salt = AESUtil.generateSalt();
        }

        try {
            SecretKey secretKey = AESUtil.deriveKey(masterPassword, salt);
            String encryptedPassword = AESUtil.encrypt(updatedPassword.getPassword(), secretKey);
            updatedPassword.setPassword(encryptedPassword);
            updatedPassword.setSalt(salt); // Preserve or add salt
        } catch (Exception e) {
            throw new RuntimeException("Encryption failed", e);
        }

        updatedPassword.setId(passwordId);
        updatedPassword.setUserId(existingPassword.getUserId()); // Ensure userId consistency

        return passwordRepository.save(updatedPassword);
    }

    public boolean userOwnsPassword(UUID userId, UUID passwordId) {
        Optional<Password> password = passwordRepository.findById(passwordId);
        return password.isPresent() && password.get().getUserId().equals(userId);
    }
    public void deletePassword(UUID passwordId) {
        passwordRepository.deleteById(passwordId);
    }
}

