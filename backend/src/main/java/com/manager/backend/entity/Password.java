package com.manager.backend.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "passwords")
public class Password {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String item_name;
    private String username;
    private String uri;
    private String password;
    private String notes;

    @Column(name = "user_id")
    private Long userId;
    // Constructors
    public Password() {}

    public Password(String itemName, String username, String uri, String password, String notes) {
        this.item_name = itemName;
        this.username = username;
        this.uri = uri;
        this.password = password;
        this.notes = notes;
    }

    // Getters and Setters

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemName() {
        return item_name;
    }

    public void setItemName(String itemName) {
        this.item_name = itemName;
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