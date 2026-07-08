package com.heyaatounisiya.backend.repository;

import com.heyaatounisiya.backend.entity.TechnicienProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TechnicienProfileRepository extends JpaRepository<TechnicienProfile, Long> {

    Optional<TechnicienProfile> findByUser_Id(Long userId);

    boolean existsByUser_Id(Long userId);
}
