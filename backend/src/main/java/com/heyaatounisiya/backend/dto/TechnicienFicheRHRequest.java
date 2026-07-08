package com.heyaatounisiya.backend.dto;
public record TechnicienFicheRHRequest(
        // Contacts famille
        String nomParent,
        String gsmParent,
        String gsmBinome,
        // Reseaux sociaux
        String facebook,
        String tiktok,
        String instagram,
        // Scolarite / permis
        String niveauScolaire,
        boolean permisConduireRh,
        String permisDateLivraison, // format ISO "yyyy-MM-dd"
        // Contrat / administratif
        String typeContrat,
        String numeroCnss,
        String numeroD17,
        String numeroBanquePoste,
        String dateEmbauche, // format ISO "yyyy-MM-dd"
        String experienceSocietesPeriode,
        Double salaireDepart,
        Integer nombreJoursConge,
        String gsmSociete,
        // Donnees medicales / physiques
        String groupeSanguin,
        Double poidsKg,
        Double hauteurCm,
        Integer pointureChaussure,
        String tailleVetements,
        String maladiesChroniques,
        String allergies,
        String operationsSubies,
        Boolean enceinte,
        boolean tatouage,
        // Observations
        String observationsRh
) {}