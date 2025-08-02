package com.example.telemedicine_consultation_app.repository;

import com.example.telemedicine_consultation_app.models.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    List<Doctor> findByDoctorSpecialization(String doctorSpecialization);

    Doctor findByDoctorName(String doctorName);

}
