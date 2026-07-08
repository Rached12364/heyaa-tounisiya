package com.heyaatounisiya.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Historique de toutes les tentatives de connexion (réussies ou échouées).
 * Permet un audit complet : qui s'est connecté, quand, depuis quelle IP.
 */
@Entity
@Table(name = "login_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Email utilisé lors de la tentative (on le garde même si l'utilisateur
     * n'existe pas, pour détecter les tentatives suspectes).
     */
    @Column(nullable = false)
    private String emailTente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private boolean success;

    @Column(name = "ip_address", length = 64)
    private String ipAddress;

    @Column(name = "user_agent", length = 255)
    private String userAgent;

    @Column(name = "login_at", nullable = false)
    private LocalDateTime loginAt;

    @PrePersist
    protected void onCreate() {
        this.loginAt = LocalDateTime.now();
    }
}
