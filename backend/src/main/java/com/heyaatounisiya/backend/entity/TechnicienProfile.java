package com.heyaatounisiya.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "technicien_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TechnicienProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    // ===== Informations personnelles =====
    private String cin;
    private LocalDate dateNaissance;

    @Enumerated(EnumType.STRING)
    private Sexe sexe;

    @Column(length = 500)
    private String adresse;

    private String ville;
    private String gouvernorat;
    private String telephoneSecondaire;

    // ===== Informations professionnelles =====
    private String matricule;

    @Enumerated(EnumType.STRING)
    private Metier metier;

    private String specialite;

    @Enumerated(EnumType.STRING)
    private NiveauEtudes niveauEtudes;

    private String diplome;
    private String etablissement;
    private Integer anneeObtention;
    private Integer anneesExperience;
    private String entrepriseActuelle;

    @Enumerated(EnumType.STRING)
    private StatutProfessionnel statutProfessionnel;

    // ===== Compétences techniques =====
    private boolean competenceCctv;
    private boolean competenceControleAcces;
    private boolean competenceReseaux;
    private boolean competenceFibreOptique;
    private boolean competenceElectricite;
    private boolean competenceDomotique;
    private boolean competenceMaintenanceInformatique;
    private boolean competenceAlarmesIntrusion;
    private boolean competenceDetectionIncendie;

    @Column(length = 1000)
    private String autresCompetences;

    // ===== Spécifique sécurité électronique (CCTV) =====
    private boolean travailleSecuriteElectronique;
    private boolean experienceCamerasIp;
    private boolean experienceNvrDvr;

    @Column(length = 500)
    private String marquesMaitrisees;

    private boolean configurationReseau;
    private boolean pointageBiometrique;
    private boolean interphonieIp;
    private boolean soudureFibreOptique;

    @Column(length = 500)
    private String certifications;

    // ===== Permis et mobilité =====
    private boolean permisConduire;

    @Enumerated(EnumType.STRING)
    private CategoriePermis categoriePermis;

    private boolean vehiculePersonnel;
    private boolean disponibleDeplacement;

    @Column(length = 1000)
    private String zonesIntervention;

    // ===== Documents (chemins relatifs vers les fichiers stockés) =====
    private String cinDocumentPath;
    private String cvDocumentPath;
    private String diplomeDocumentPath;
    private String attestationTravailPath;
    private String photoIdentitePath;
    private String casierJudiciairePath;

    // ===== Disponibilité =====
    private boolean disponibleImmediatement;

    @Enumerated(EnumType.STRING)
    private TypeDisponibilite typeDisponibilite;

    private Double salaireSouhaite;

    // ===== Coordonnées bancaires (optionnel) =====
    private String banque;
    private String rib;

    // ===== Observations =====
    @Column(length = 2000)
    private String commentaires;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
