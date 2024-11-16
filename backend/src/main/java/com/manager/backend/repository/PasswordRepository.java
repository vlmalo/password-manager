package com.manager.backend.repository;

import com.manager.backend.entity.Password;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PasswordRepository extends JpaRepository<Password, UUID> {
    List<Password> findByUserId(UUID userId);
}
