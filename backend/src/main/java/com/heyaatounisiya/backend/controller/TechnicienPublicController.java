package com.heyaatounisiya.backend.controller;
import com.heyaatounisiya.backend.dto.TechnicienPublicResponse;
import com.heyaatounisiya.backend.entity.TechnicienProfile;
import com.heyaatounisiya.backend.repository.TechnicienProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
/**
 * Endpoints publics (accessibles sans authentification, voir SecurityConfig: /api/techniciens/** -> permitAll).
 * N'expose que des donnees non sensibles.
 */
@RestController
@RequestMapping("/api/techniciens")
@RequiredArgsConstructor
public class TechnicienPublicController {
    private final TechnicienProfileRepository technicienProfileRepository;
    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(technicienProfileRepository.count());
    }
    @GetMapping
    public ResponseEntity<List<TechnicienPublicResponse>> list() {
        List<TechnicienPublicResponse> result = technicienProfileRepository.findAll()
                .stream()
                .map(this::toPublic)
                .toList();
        return ResponseEntity.ok(result);
    }
    private TechnicienPublicResponse toPublic(TechnicienProfile p) {
        return new TechnicienPublicResponse(
                p.getId(),
                p.getUser().getNom(),
                p.getUser().getPrenom(),
                p.getMetier() != null ? p.getMetier().name() : null,
                p.getSpecialite(),
                p.getVille(),
                p.getGouvernorat(),
                p.getAnneesExperience()
        );
    }
}