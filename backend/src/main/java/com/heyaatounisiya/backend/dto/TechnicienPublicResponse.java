package com.heyaatounisiya.backend.dto;
public record TechnicienPublicResponse(
        Long id,
        String nom,
        String prenom,
        String metier,
        String specialite,
        String ville,
        String gouvernorat,
        Integer anneesExperience
) {}