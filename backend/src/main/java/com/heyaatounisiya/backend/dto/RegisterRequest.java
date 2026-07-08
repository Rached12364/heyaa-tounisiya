package com.heyaatounisiya.backend.dto;

import com.heyaatounisiya.backend.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(

        @NotBlank(message = "Le nom est obligatoire")
        String nom,

        @NotBlank(message = "Le prénom est obligatoire")
        String prenom,

        @NotBlank(message = "L'adresse email est obligatoire")
        @Email(message = "Format d'email invalide")
        String email,

        @NotBlank(message = "Le numéro de téléphone est obligatoire")
        @Pattern(
                regexp = "^(\\+216)?[2459][0-9]{7}$",
                message = "Numéro de téléphone tunisien invalide (ex: 54555277 ou +21654555277)"
        )
        String phone,

        @NotBlank(message = "Le mot de passe est obligatoire")
        @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères")
        String password,

        @NotNull(message = "Le rôle est obligatoire")
        Role role
) {}
