package com.heyaatounisiya.backend.service;
import com.heyaatounisiya.backend.entity.LoginHistory;
import com.heyaatounisiya.backend.entity.User;
import com.heyaatounisiya.backend.repository.LoginHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
@Service
@RequiredArgsConstructor
public class LoginAuditService {
    private final LoginHistoryRepository loginHistoryRepository;
    /**
     * Propagation.REQUIRES_NEW : cette transaction est indépendante de celle
     * de l'appelant. Même si AuthService.login() échoue et fait un rollback
     * ensuite, cette ligne d'audit reste enregistrée.
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void record(String email, User user, boolean success, String ip, String userAgent) {
        loginHistoryRepository.save(LoginHistory.builder()
                .emailTente(email)
                .user(user)
                .success(success)
                .ipAddress(ip)
                .userAgent(userAgent)
                .build());
    }
}