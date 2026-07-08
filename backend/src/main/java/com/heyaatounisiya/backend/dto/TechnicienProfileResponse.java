package com.heyaatounisiya.backend.dto;

import com.heyaatounisiya.backend.entity.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record TechnicienProfileResponse(
        Long id,
        String cin,
        LocalDate dateNaissance,
        Sexe sexe,
        String adresse,
        String ville,
        String gouvernorat,
        String telephoneSecondaire,

        String matricule,
        Metier metier,
        String specialite,
        NiveauEtudes niveauEtudes,
        String diplome,
        String etablissement,
        Integer anneeObtention,
        Integer anneesExperience,
        String entrepriseActuelle,
        StatutProfessionnel statutProfessionnel,

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

        boolean travailleSecuriteElectronique,
        boolean experienceCamerasIp,
        boolean experienceNvrDvr,
        String marquesMaitrisees,
        boolean configurationReseau,
        boolean pointageBiometrique,
        boolean interphonieIp,
        boolean soudureFibreOptique,
        String certifications,

        boolean permisConduire,
        CategoriePermis categoriePermis,
        boolean vehiculePersonnel,
        boolean disponibleDeplacement,
        String zonesIntervention,

        boolean cinDocumentUploaded,
        boolean cvDocumentUploaded,
        boolean diplomeDocumentUploaded,
        boolean attestationTravailUploaded,
        boolean photoIdentiteUploaded,
        boolean casierJudiciaireUploaded,

        boolean disponibleImmediatement,
        TypeDisponibilite typeDisponibilite,
        Double salaireSouhaite,

        String banque,
        String rib,

        String commentaires,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static TechnicienProfileResponse fromEntity(TechnicienProfile p) {
        return new TechnicienProfileResponse(
                p.getId(), p.getCin(), p.getDateNaissance(), p.getSexe(), p.getAdresse(), p.getVille(),
                p.getGouvernorat(), p.getTelephoneSecondaire(),
                p.getMatricule(), p.getMetier(), p.getSpecialite(), p.getNiveauEtudes(), p.getDiplome(),
                p.getEtablissement(), p.getAnneeObtention(), p.getAnneesExperience(), p.getEntrepriseActuelle(),
                p.getStatutProfessionnel(),
                p.isCompetenceCctv(), p.isCompetenceControleAcces(), p.isCompetenceReseaux(),
                p.isCompetenceFibreOptique(), p.isCompetenceElectricite(), p.isCompetenceDomotique(),
                p.isCompetenceMaintenanceInformatique(), p.isCompetenceAlarmesIntrusion(),
                p.isCompetenceDetectionIncendie(), p.getAutresCompetences(),
                p.isTravailleSecuriteElectronique(), p.isExperienceCamerasIp(), p.isExperienceNvrDvr(),
                p.getMarquesMaitrisees(), p.isConfigurationReseau(), p.isPointageBiometrique(),
                p.isInterphonieIp(), p.isSoudureFibreOptique(), p.getCertifications(),
                p.isPermisConduire(), p.getCategoriePermis(), p.isVehiculePersonnel(),
                p.isDisponibleDeplacement(), p.getZonesIntervention(),
                p.getCinDocumentPath() != null, p.getCvDocumentPath() != null, p.getDiplomeDocumentPath() != null,
                p.getAttestationTravailPath() != null, p.getPhotoIdentitePath() != null,
                p.getCasierJudiciairePath() != null,
                p.isDisponibleImmediatement(), p.getTypeDisponibilite(), p.getSalaireSouhaite(),
                p.getBanque(), p.getRib(),
                p.getCommentaires(), p.getCreatedAt(), p.getUpdatedAt()
        );
    }
}
