package com.heyaatounisiya.backend.dto;

public record TechnicienProfileRequest(
        // Informations personnelles
        String cin,
        String dateNaissance,   // format ISO "yyyy-MM-dd"
        String sexe,            // "HOMME" | "FEMME"
        String adresse,
        String ville,
        String gouvernorat,
        String telephoneSecondaire,

        // Informations professionnelles
        String matricule,
        String metier,
        String specialite,
        String niveauEtudes,
        String diplome,
        String etablissement,
        Integer anneeObtention,
        Integer anneesExperience,
        String entrepriseActuelle,
        String statutProfessionnel,

        // Compétences techniques
        boolean competenceCctv,
        boolean competenceControleAcces,
        boolean competenceReseaux,
        boolean competenceFibreOptique,
        boolean competenceElectricite,
        boolean competenceDomotique,
        boolean competenceMaintenanceInformatique,
        boolean competenceAlarmesIntrusion,
        boolean competenceDetectionIncendie,
        String autresCompetences,

        // Spécifique sécurité électronique (CCTV)
        boolean travailleSecuriteElectronique,
        boolean experienceCamerasIp,
        boolean experienceNvrDvr,
        String marquesMaitrisees,
        boolean configurationReseau,
        boolean pointageBiometrique,
        boolean interphonieIp,
        boolean soudureFibreOptique,
        String certifications,

        // Permis et mobilité
        boolean permisConduire,
        String categoriePermis,
        boolean vehiculePersonnel,
        boolean disponibleDeplacement,
        String zonesIntervention,

        // Disponibilité
        boolean disponibleImmediatement,
        String typeDisponibilite,
        Double salaireSouhaite,

        // Coordonnées bancaires (optionnel)
        String banque,
        String rib,

        // Observations
        String commentaires
) {}
