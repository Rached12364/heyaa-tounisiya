package com.heyaatounisiya.backend.service;

import com.heyaatounisiya.backend.dto.TechnicienProfileRequest;
import com.heyaatounisiya.backend.dto.TechnicienProfileResponse;
import com.heyaatounisiya.backend.entity.*;
import com.heyaatounisiya.backend.repository.TechnicienProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class TechnicienProfileService {

    private final TechnicienProfileRepository repository;
    private final FileStorageService fileStorageService;

    @Transactional(readOnly = true)
    public TechnicienProfileResponse getMyProfile(User user) {
        TechnicienProfile profile = repository.findByUser_Id(user.getId())
                .orElseThrow(() -> new IllegalStateException("Aucun profil technicien trouvé pour cet utilisateur"));
        return TechnicienProfileResponse.fromEntity(profile);
    }

    @Transactional(readOnly = true)
    public boolean hasProfile(User user) {
        return repository.existsByUser_Id(user.getId());
    }

    @Transactional
    public TechnicienProfileResponse saveOrUpdate(
            User user,
            TechnicienProfileRequest req,
            MultipartFile cinDocument,
            MultipartFile cvDocument,
            MultipartFile diplomeDocument,
            MultipartFile attestationTravail,
            MultipartFile photoIdentite,
            MultipartFile casierJudiciaire
    ) throws IOException {

        TechnicienProfile profile = repository.findByUser_Id(user.getId())
                .orElseGet(() -> TechnicienProfile.builder().user(user).build());

        applyRequest(profile, req);

        String subfolder = "technicien/" + user.getId();

        String cinPath = fileStorageService.store(cinDocument, subfolder);
        if (cinPath != null) profile.setCinDocumentPath(cinPath);

        String cvPath = fileStorageService.store(cvDocument, subfolder);
        if (cvPath != null) profile.setCvDocumentPath(cvPath);

        String diplomePath = fileStorageService.store(diplomeDocument, subfolder);
        if (diplomePath != null) profile.setDiplomeDocumentPath(diplomePath);

        String attestationPath = fileStorageService.store(attestationTravail, subfolder);
        if (attestationPath != null) profile.setAttestationTravailPath(attestationPath);

        String photoPath = fileStorageService.store(photoIdentite, subfolder);
        if (photoPath != null) profile.setPhotoIdentitePath(photoPath);

        String casierPath = fileStorageService.store(casierJudiciaire, subfolder);
        if (casierPath != null) profile.setCasierJudiciairePath(casierPath);

        TechnicienProfile saved = repository.save(profile);
        return TechnicienProfileResponse.fromEntity(saved);
    }

    /** Retourne le chemin relatif du document demandé pour un utilisateur donné, ou null. */
    @Transactional(readOnly = true)
    public String getDocumentPath(User user, DocumentType type) {
        TechnicienProfile profile = repository.findByUser_Id(user.getId())
                .orElseThrow(() -> new IllegalStateException("Aucun profil technicien trouvé"));

        return switch (type) {
            case CIN -> profile.getCinDocumentPath();
            case CV -> profile.getCvDocumentPath();
            case DIPLOME -> profile.getDiplomeDocumentPath();
            case ATTESTATION -> profile.getAttestationTravailPath();
            case PHOTO -> profile.getPhotoIdentitePath();
            case CASIER -> profile.getCasierJudiciairePath();
        };
    }

    private void applyRequest(TechnicienProfile profile, TechnicienProfileRequest req) {
        profile.setCin(req.cin());
        profile.setDateNaissance(parseDate(req.dateNaissance()));
        profile.setSexe(parseEnum(Sexe.class, req.sexe()));
        profile.setAdresse(req.adresse());
        profile.setVille(req.ville());
        profile.setGouvernorat(req.gouvernorat());
        profile.setTelephoneSecondaire(req.telephoneSecondaire());

        profile.setMatricule(req.matricule());
        profile.setMetier(parseEnum(Metier.class, req.metier()));
        profile.setSpecialite(req.specialite());
        profile.setNiveauEtudes(parseEnum(NiveauEtudes.class, req.niveauEtudes()));
        profile.setDiplome(req.diplome());
        profile.setEtablissement(req.etablissement());
        profile.setAnneeObtention(req.anneeObtention());
        profile.setAnneesExperience(req.anneesExperience());
        profile.setEntrepriseActuelle(req.entrepriseActuelle());
        profile.setStatutProfessionnel(parseEnum(StatutProfessionnel.class, req.statutProfessionnel()));

        profile.setCompetenceCctv(req.competenceCctv());
        profile.setCompetenceControleAcces(req.competenceControleAcces());
        profile.setCompetenceReseaux(req.competenceReseaux());
        profile.setCompetenceFibreOptique(req.competenceFibreOptique());
        profile.setCompetenceElectricite(req.competenceElectricite());
        profile.setCompetenceDomotique(req.competenceDomotique());
        profile.setCompetenceMaintenanceInformatique(req.competenceMaintenanceInformatique());
        profile.setCompetenceAlarmesIntrusion(req.competenceAlarmesIntrusion());
        profile.setCompetenceDetectionIncendie(req.competenceDetectionIncendie());
        profile.setAutresCompetences(req.autresCompetences());

        profile.setTravailleSecuriteElectronique(req.travailleSecuriteElectronique());
        profile.setExperienceCamerasIp(req.experienceCamerasIp());
        profile.setExperienceNvrDvr(req.experienceNvrDvr());
        profile.setMarquesMaitrisees(req.marquesMaitrisees());
        profile.setConfigurationReseau(req.configurationReseau());
        profile.setPointageBiometrique(req.pointageBiometrique());
        profile.setInterphonieIp(req.interphonieIp());
        profile.setSoudureFibreOptique(req.soudureFibreOptique());
        profile.setCertifications(req.certifications());

        profile.setPermisConduire(req.permisConduire());
        profile.setCategoriePermis(parseEnum(CategoriePermis.class, req.categoriePermis()));
        profile.setVehiculePersonnel(req.vehiculePersonnel());
        profile.setDisponibleDeplacement(req.disponibleDeplacement());
        profile.setZonesIntervention(req.zonesIntervention());

        profile.setDisponibleImmediatement(req.disponibleImmediatement());
        profile.setTypeDisponibilite(parseEnum(TypeDisponibilite.class, req.typeDisponibilite()));
        profile.setSalaireSouhaite(req.salaireSouhaite());

        profile.setBanque(req.banque());
        profile.setRib(req.rib());

        profile.setCommentaires(req.commentaires());
    }

    private LocalDate parseDate(String value) {
        if (value == null || value.isBlank()) return null;
        try {
            return LocalDate.parse(value);
        } catch (Exception e) {
            return null;
        }
    }

    private <T extends Enum<T>> T parseEnum(Class<T> enumClass, String value) {
        if (value == null || value.isBlank()) return null;
        try {
            return Enum.valueOf(enumClass, value.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
