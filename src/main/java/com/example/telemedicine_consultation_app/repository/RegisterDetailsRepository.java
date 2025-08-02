package com.example.telemedicine_consultation_app.repository;

import com.example.telemedicine_consultation_app.models.RegisterDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegisterDetailsRepository extends JpaRepository<RegisterDetails,Integer>{
    Optional<RegisterDetails> findByUserName(String username);
}
