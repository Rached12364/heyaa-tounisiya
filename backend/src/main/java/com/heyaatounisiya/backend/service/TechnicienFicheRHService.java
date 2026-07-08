package com.heyaatounisiya.backend.service;
import com.heyaatounisiya.backend.dto.TechnicienFicheRHRequest;
import com.heyaatounisiya.backend.dto.TechnicienFicheRHResponse;
import com.heyaatounisiya.backend.entity.TechnicienFicheRH;
import com.heyaatounisiya.backend.entity.User;
import com.heyaatounisiya.backend.repository.TechnicienFicheRHRepository;
import com.heyaatounisiya.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.heyaatounisiya.backend.entity.DocumentType;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
@Service
@RequiredArgsConstructor
public class TechnicienFicheRHService {
    private final TechnicienFicheRHRepository ficheRHRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    public TechnicienFicheRHResponse getByUserId(Long userId) {
        TechnicienFicheRH fiche = ficheRHRepository.findByUserId(userId)
                .orElseThrow(() -> new NoSuchElementException("Fiche RH introuvable pour cet utilisateur"));
        return toResponse(fiche);
    }
    public List<TechnicienFicheRHResponse> getAll() {
        return ficheRHRepository.findAll().stream().map(this::toResponse).toList();
    }
    public TechnicienFicheRHResponse saveOrUpdate(
            Long userId, 
            TechnicienFicheRHRequest data,
            MultipartFile extraitNaissanceDocument,
            MultipartFile permisDocument,
            MultipartFile signatureDocument
    ) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("Utilisateur introuvable"));
        TechnicienFicheRH fiche = ficheRHRepository.findByUser(user)
                .orElseGet(() -> TechnicienFicheRH.builder().user(user).build());
        fiche.setNomParent(data.nomParent());
        fiche.setGsmParent(data.gsmParent());
        fiche.setGsmBinome(data.gsmBinome());
        fiche.setFacebook(data.facebook());
        fiche.setTiktok(data.tiktok());
        fiche.setInstagram(data.instagram());
        fiche.setNiveauScolaire(data.niveauScolaire());
        fiche.setPermisConduireRh(data.permisConduireRh());
        fiche.setPermisDateLivraison(parseDate(data.permisDateLivraison()));
        fiche.setTypeContrat(data.typeContrat());
        fiche.setNumeroCnss(data.numeroCnss());
        fiche.setNumeroD17(data.numeroD17());
        fiche.setNumeroBanquePoste(data.numeroBanquePoste());
        fiche.setDateEmbauche(parseDate(data.dateEmbauche()));
        fiche.setExperienceSocietesPeriode(data.experienceSocietesPeriode());
        fiche.setSalaireDepart(data.salaireDepart());
        fiche.setNombreJoursConge(data.nombreJoursConge());
        fiche.setGsmSociete(data.gsmSociete());
        fiche.setGroupeSanguin(data.groupeSanguin());
        fiche.setPoidsKg(data.poidsKg());
        fiche.setHauteurCm(data.hauteurCm());
        fiche.setPointureChaussure(data.pointureChaussure());
        fiche.setTailleVetements(data.tailleVetements());
        fiche.setMaladiesChroniques(data.maladiesChroniques());
        fiche.setAllergies(data.allergies());
        fiche.setOperationsSubies(data.operationsSubies());
        fiche.setEnceinte(data.enceinte());
        fiche.setTatouage(data.tatouage());
        fiche.setObservationsRh(data.observationsRh());

        if (extraitNaissanceDocument != null && !extraitNaissanceDocument.isEmpty()) {
            String path = fileStorageService.storeFile(user.getId(), DocumentType.EXTRAIT_NAISSANCE, extraitNaissanceDocument);
            fiche.setExtraitNaissanceDocumentPath(path);
        }
        if (permisDocument != null && !permisDocument.isEmpty()) {
            String path = fileStorageService.storeFile(user.getId(), DocumentType.PERMIS, permisDocument);
            fiche.setPermisDocumentPath(path);
        }
        if (signatureDocument != null && !signatureDocument.isEmpty()) {
            String path = fileStorageService.storeFile(user.getId(), DocumentType.SIGNATURE, signatureDocument);
            fiche.setSignatureDocumentPath(path);
        }

        TechnicienFicheRH saved = ficheRHRepository.save(fiche);
        return toResponse(saved);
    }
    private LocalDate parseDate(String value) {
        return (value == null || value.isBlank()) ? null : LocalDate.parse(value);
    }
    private TechnicienFicheRHResponse toResponse(TechnicienFicheRH f) {
        return new TechnicienFicheRHResponse(
                f.getId(),
                f.getUser().getId(),
                f.getUser().getNom(),
                f.getUser().getPrenom(),
                f.getNomParent(),
                f.getGsmParent(),
                f.getGsmBinome(),
                f.getFacebook(),
                f.getTiktok(),
                f.getInstagram(),
                f.getNiveauScolaire(),
                f.isPermisConduireRh(),
                f.getPermisDateLivraison(),
                f.getTypeContrat(),
                f.getNumeroCnss(),
                f.getNumeroD17(),
                f.getNumeroBanquePoste(),
                f.getDateEmbauche(),
                f.getExperienceSocietesPeriode(),
                f.getSalaireDepart(),
                f.getNombreJoursConge(),
                f.getGsmSociete(),
                f.getGroupeSanguin(),
                f.getPoidsKg(),
                f.getHauteurCm(),
                f.getPointureChaussure(),
                f.getTailleVetements(),
                f.getMaladiesChroniques(),
                f.getAllergies(),
                f.getOperationsSubies(),
                f.getEnceinte(),
                f.isTatouage(),
                f.getExtraitNaissanceDocumentPath(),
                f.getPermisDocumentPath(),
                f.getSignatureDocumentPath(),
                f.getObservationsRh(),
                f.getCreatedAt(),
                f.getUpdatedAt()
        );
    }
}