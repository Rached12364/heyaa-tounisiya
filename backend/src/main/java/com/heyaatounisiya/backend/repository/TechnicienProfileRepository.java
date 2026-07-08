package com.heyaatounisiya.backend.repository;

import com.heyaatounisiya.backend.entity.TechnicienProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import java.util.List;

public interface TechnicienProfileRepository extends JpaRepository<TechnicienProfile, Long> {

    @EntityGraph(attributePaths = {"user"})
    List<TechnicienProfile> findAll();

    Optional<TechnicienProfile> findByUser_Id(Long userId);

    boolean existsByUser_Id(Long userId);
}
