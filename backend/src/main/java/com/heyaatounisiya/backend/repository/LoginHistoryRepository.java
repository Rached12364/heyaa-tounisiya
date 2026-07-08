package com.heyaatounisiya.backend.repository;

import com.heyaatounisiya.backend.entity.LoginHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoginHistoryRepository extends JpaRepository<LoginHistory, Long> {

    List<LoginHistory> findByUser_IdOrderByLoginAtDesc(Long userId);

    List<LoginHistory> findByEmailTenteOrderByLoginAtDesc(String email);
}
