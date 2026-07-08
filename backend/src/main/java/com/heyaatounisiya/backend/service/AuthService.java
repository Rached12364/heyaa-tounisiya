package com.heyaatounisiya.backend.service;
import com.heyaatounisiya.backend.dto.AuthResponse;
import com.heyaatounisiya.backend.dto.LoginRequest;
import com.heyaatounisiya.backend.dto.RegisterRequest;
import com.heyaatounisiya.backend.dto.UserResponse;
import com.heyaatounisiya.backend.entity.User;
import com.heyaatounisiya.backend.exception.EmailAlreadyExistsException;
import com.heyaatounisiya.backend.exception.InvalidCredentialsException;
import com.heyaatounisiya.backend.exception.PhoneAlreadyExistsException;
import com.heyaatounisiya.backend.repository.UserRepository;
import com.heyaatounisiya.backend.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final LoginAuditService loginAuditService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new EmailAlreadyExistsException(request.email());
        }
        if (userRepository.existsByPhone(request.phone())) {
            throw new PhoneAlreadyExistsException(request.phone());
        }
        User user = User.builder()
                .nom(request.nom())
                .prenom(request.prenom())
                .email(request.email().toLowerCase().trim())
                .phone(normalizePhone(request.phone()))
                .password(passwordEncoder.encode(request.password()))
                .role(request.role())
                .enabled(true)
                .build();
        User saved = userRepository.save(user);
        String token = jwtService.generateToken(saved);
        return AuthResponse.of(token, UserResponse.fromEntity(saved));
    }
    @Transactional
    public AuthResponse login(LoginRequest request, HttpServletRequest httpRequest) {
        String email = request.email().toLowerCase().trim();
        User user = userRepository.findByEmail(email).orElse(null);
        boolean success = user != null && passwordEncoder.matches(request.password(), user.getPassword());
        // Transaction séparée : l'audit est toujours enregistré, même si le login échoue ensuite
        loginAuditService.record(
                email,
                user,
                success,
                extractClientIp(httpRequest),
                httpRequest.getHeader("User-Agent")
        );
        if (!success) {
            throw new InvalidCredentialsException();
        }
        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);
        String token = jwtService.generateToken(user);
        return AuthResponse.of(token, UserResponse.fromEntity(user));
    }
    private String normalizePhone(String phone) {
        String trimmed = phone.trim();
        if (trimmed.startsWith("+216")) {
            return trimmed;
        }
        return "+216" + trimmed;
    }
    private String extractClientIp(HttpServletRequest request) {
        String forwardedFor = request.getHeader("X-Forwarded-For");
        if (forwardedFor != null && !forwardedFor.isBlank()) {
            return forwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}