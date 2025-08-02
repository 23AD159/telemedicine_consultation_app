package com.example.telemedicine_consultation_app.services;

import com.example.telemedicine_consultation_app.models.Patient;
import com.example.telemedicine_consultation_app.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }
}
