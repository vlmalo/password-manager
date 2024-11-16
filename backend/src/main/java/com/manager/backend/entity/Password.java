package com.manager.backend.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.UUID;

@Entity
@Table(name = "passwords")
public class Password {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private UUID id;

    @Pattern(regexp = "^[a-zA-Z0-9._-]*$", message = "Item name can only contain letters, numbers, '.', '-', and '_'.")
    @NotBlank(message = "Item name is required.")
    @Size(min = 3, max = 50, message = "Item name must be between 3 and 50 characters.")
    private String itemName;

    @Pattern(regexp = "^[a-zA-Z0-9._-]*$", message = "Username can only contain letters, numbers, '.', '-', and '_'.")
    @NotBlank(message = "Username is required.")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters.")
    private String username;

    @Pattern(regexp = "(^$|https?://[A-Za-z0-9-._~:/?&=+#\\[\\]@!$'()*+,;]+)", message = "URI must start with http:// or https:// and contain only valid URL characters.")
    private String uri;




    @NotBlank(message = "Password is required.")
    @Size(min = 1, max = 64, message = "Password must be between 1 and 64 characters.")
    private String password;

    @Size(max = 200, message = "Notes cannot exceed 200 characters.")
    @Pattern(regexp = "^[a-zA-Z0-9\\s.,!@#$%^&*()]*$", message = "Only certain special characters are allowed (.,!@#$%^&*).")
    private String notes;

    private byte[] salt;

    @Column(name = "user_id")
    private UUID userId;
    // Constructors
    public Password() {}

    public Password(String itemName, String username, String uri, String password, String notes, UUID userId) {
        this.itemName = itemName;
        this.username = username;
        this.uri = uri;
        this.password = password;
        this.notes = notes;
        this.userId = userId;
    }

    // Getters and Setters
    public byte[] getSalt() {
        return salt;
    }

    public void setSalt(byte[] salt) {
        this.salt = salt;
    }
    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}