package com.heyaatounisiya.backend.controller;

import com.heyaatounisiya.backend.dto.TechnicienProfileRequest;
import com.heyaatounisiya.backend.dto.TechnicienProfileResponse;
import com.heyaatounisiya.backend.entity.DocumentType;
import com.heyaatounisiya.backend.entity.User;
import com.heyaatounisiya.backend.service.FileStorageService;
import com.heyaatounisiya.backend.service.TechnicienProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/technicien/profil")
@RequiredArgsConstructor
public class TechnicienProfileController {

    private final TechnicienProfileService profileService;
    private final FileStorageService fileStorageService;

    @GetMapping("/me")
    public ResponseEntity<TechnicienProfileResponse> getMyProfile(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(profileService.getMyProfile(user));
    }

    @GetMapping("/me/exists")
    public ResponseEntity<Boolean> hasProfile(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(profileService.hasProfile(user));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TechnicienProfileResponse> saveProfile(
            @AuthenticationPrincipal User user,
            @RequestPart("data") TechnicienProfileRequest data,
            @RequestPart(value = "cinDocument", required = false) MultipartFile cinDocument,
            @RequestPart(value = "cvDocument", required = false) MultipartFile cvDocument,
            @RequestPart(value = "diplomeDocument", required = false) MultipartFile diplomeDocument,
            @RequestPart(value = "attestationTravail", required = false) MultipartFile attestationTravail,
            @RequestPart(value = "photoIdentite", required = false) MultipartFile photoIdentite,
            @RequestPart(value = "casierJudiciaire", required = false) MultipartFile casierJudiciaire
    ) throws IOException {
        TechnicienProfileResponse response = profileService.saveOrUpdate(
                user, data, cinDocument, cvDocument, diplomeDocument,
                attestationTravail, photoIdentite, casierJudiciaire
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me/documents/{type}")
    public ResponseEntity<Resource> downloadOwnDocument(
            @AuthenticationPrincipal User user,
            @PathVariable DocumentType type
    ) {
        String path = profileService.getDocumentPath(user, type);
        if (path == null) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = fileStorageService.loadAsResource(path);
        String contentType = fileStorageService.detectContentType(path);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
