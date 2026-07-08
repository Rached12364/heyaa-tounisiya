package com.heyaatounisiya.backend.dto;

import com.heyaatounisiya.backend.entity.Role;
import com.heyaatounisiya.backend.entity.User;

import java.time.LocalDateTime;

public record UserResponse(
        Long id,
        String nom,
        String prenom,
        String email,
        String phone,
        Role role,
        LocalDateTime createdAt,
        LocalDateTime lastLoginAt
) {
    public static UserResponse fromEntity(User user) {
        return new UserResponse(
                user.getId(),
                user.getNom(),
                user.getPrenom(),
                user.getEmail(),
                user.getPhone(),
                user.getRole(),
                user.getCreatedAt(),
                user.getLastLoginAt()
        );
    }
}
