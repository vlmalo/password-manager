package com.manager.backend.service;

import com.manager.backend.entity.Password;
import com.manager.backend.repository.PasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

}