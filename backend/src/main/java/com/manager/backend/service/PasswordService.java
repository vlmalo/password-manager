package com.manager.backend.service;

import com.manager.backend.config.AESUtil;
import com.manager.backend.entity.Password;
import com.manager.backend.repository.PasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.List;
import java.util.Optional;

@Service
public class PasswordService {

    private final PasswordRepository passwordRepository;

    @Autowired
    public PasswordService(PasswordRepository passwordRepository) {
        this.passwordRepository = passwordRepository;
    }

    public List<Password> getPasswordsByUserId(Long userId, String masterPassword) {
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


    public Optional<Password> getPasswordById(Long id) {
        return passwordRepository.findById(id);
    }


    public List<Password> getAllPasswords() {
        return passwordRepository.findAll();
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



    public Password updatePassword(Long passwordId, Password updatedPassword, String masterPassword, byte[] salt) {
        // Ensure that the password exists before updating
        if (!passwordRepository.existsById(passwordId)) {
            throw new RuntimeException("Password not found");
        }

        try {
            SecretKey secretKey = AESUtil.deriveKey(masterPassword, salt);
            String encryptedPassword = AESUtil.encrypt(updatedPassword.getPassword(), secretKey);
            updatedPassword.setPassword(encryptedPassword);
        } catch (Exception e) {
            throw new RuntimeException("Encryption failed", e);
        }

        updatedPassword.setId(passwordId);
        return passwordRepository.save(updatedPassword);
    }

    public boolean userOwnsPassword(Long userId, Long passwordId) {
        Optional<Password> password = passwordRepository.findById(passwordId);
        return password.isPresent() && password.get().getUserId().equals(userId);
    }
    public void deletePassword(Long passwordId) {
        passwordRepository.deleteById(passwordId);
    }
}

