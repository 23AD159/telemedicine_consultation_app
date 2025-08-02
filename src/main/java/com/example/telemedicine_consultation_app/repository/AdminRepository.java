package com.example.telemedicine_consultation_app.repository;

import com.example.telemedicine_consultation_app.models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin,Integer> {
    Optional<Admin> findByAdminName(String adminName);

}
