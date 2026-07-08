package com.heyaatounisiya.backend.repository;
import com.heyaatounisiya.backend.entity.TechnicienFicheRH;
import com.heyaatounisiya.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface TechnicienFicheRHRepository extends JpaRepository<TechnicienFicheRH, Long> {
    Optional<TechnicienFicheRH> findByUser(User user);
    Optional<TechnicienFicheRH> findByUserId(Long userId);
    boolean existsByUser(User user);
}