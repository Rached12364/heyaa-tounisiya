package com.heyaatounisiya.backend.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalDateTime;
/**
 * Fiche RH interne du technicien - donnees sensibles reservees a l'administration.
 * Ne JAMAIS exposer ces champs sur un profil public ou une API accessible aux entreprises.
 */
@Entity
@Table(name = "technicien_fiches_rh")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TechnicienFicheRH {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
    // ===== Contacts famille =====
    private String nomParent;
    private String gsmParent;
    private String gsmBinome;
    // ===== Reseaux sociaux =====
    private String facebook;
    private String tiktok;
    private String instagram;
    // ===== Scolarite / permis =====
    private String niveauScolaire;
    private boolean permisConduireRh;
    private LocalDate permisDateLivraison;
    // ===== Contrat / administratif =====
    private String typeContrat;
    private String numeroCnss;
    private String numeroD17;
    private String numeroBanquePoste;
    private LocalDate dateEmbauche;
    @Column(length = 1000)
    private String experienceSocietesPeriode;
    private Double salaireDepart;
    private Integer nombreJoursConge;
    private String gsmSociete;
    // ===== Donnees medicales / physiques (sensibles) =====
    private String groupeSanguin;
    private Double poidsKg;
    private Double hauteurCm;
    private Integer pointureChaussure;
    private String tailleVetements;
    @Column(length = 1000)
    private String maladiesChroniques;
    @Column(length = 1000)
    private String allergies;
    @Column(length = 1000)
    private String operationsSubies;
    private Boolean enceinte;
    private boolean tatouage;
    // ===== Documents (copies) =====
    private String extraitNaissanceDocumentPath;
    private String permisDocumentPath;
    private String signatureDocumentPath;
    @Column(length = 2000)
    private String observationsRh;
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