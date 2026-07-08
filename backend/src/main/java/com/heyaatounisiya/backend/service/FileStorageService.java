package com.heyaatounisiya.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${app.upload.dir}")
    private String uploadDir;

    /**
     * Enregistre un fichier uploadé dans un sous-dossier donné.
     * Retourne le chemin relatif à stocker en base (ou null si le fichier est vide/absent).
     */
    public String store(MultipartFile file, String subfolder) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        String extension = getExtension(file.getOriginalFilename());
        String storedFilename = UUID.randomUUID() + (extension.isEmpty() ? "" : "." + extension);

        Path dirPath = Paths.get(uploadDir, subfolder);
        Files.createDirectories(dirPath);

        Path targetPath = dirPath.resolve(storedFilename);
        file.transferTo(targetPath);

        return subfolder + "/" + storedFilename;
    }

    public Resource loadAsResource(String relativePath) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(relativePath).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() && resource.isReadable()) {
                return resource;
            }
            throw new RuntimeException("Fichier introuvable : " + relativePath);
        } catch (MalformedURLException e) {
            throw new RuntimeException("Chemin de fichier invalide : " + relativePath, e);
        }
    }

    public String detectContentType(String relativePath) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(relativePath).normalize();
            String type = Files.probeContentType(filePath);
            return type != null ? type : "application/octet-stream";
        } catch (IOException e) {
            return "application/octet-stream";
        }
    }

    private String getExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "";
        }
        return filename.substring(filename.lastIndexOf('.') + 1);
    }
}
