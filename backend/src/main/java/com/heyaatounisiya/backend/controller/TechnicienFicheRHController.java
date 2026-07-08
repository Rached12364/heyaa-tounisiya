package com.heyaatounisiya.backend.controller;
import com.heyaatounisiya.backend.dto.TechnicienFicheRHRequest;
import com.heyaatounisiya.backend.dto.TechnicienFicheRHResponse;
import com.heyaatounisiya.backend.service.TechnicienFicheRHService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
/**
 * Fiche RH interne du technicien.
 * Reserve aux administrateurs (voir SecurityConfig: /api/admin/** -> ROLE_ADMIN).
 * Ne jamais exposer ces donnees sur une API publique.
 */
@RestController
@RequestMapping("/api/admin/technicien-fiche-rh")
@RequiredArgsConstructor
public class TechnicienFicheRHController {
    private final TechnicienFicheRHService ficheRHService;
    @GetMapping
    public ResponseEntity<List<TechnicienFicheRHResponse>> getAll() {
        return ResponseEntity.ok(ficheRHService.getAll());
    }
    @GetMapping("/{userId}")
    public ResponseEntity<TechnicienFicheRHResponse> getByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(ficheRHService.getByUserId(userId));
    }
    @PutMapping("/{userId}")
    public ResponseEntity<TechnicienFicheRHResponse> saveOrUpdate(
            @PathVariable Long userId,
            @RequestBody TechnicienFicheRHRequest data
    ) {
        return ResponseEntity.ok(ficheRHService.saveOrUpdate(userId, data));
    }
}