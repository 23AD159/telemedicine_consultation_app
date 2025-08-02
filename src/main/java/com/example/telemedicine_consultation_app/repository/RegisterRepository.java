package com.example.telemedicine_consultation_app.repository;

import com.example.telemedicine_consultation_app.models.RegisterDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegisterRepository extends JpaRepository<RegisterDetails,Integer> {
    Optional<RegisterDetails> findByUserName(String username);
}
