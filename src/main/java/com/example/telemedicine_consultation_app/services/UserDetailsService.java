package com.example.telemedicine_consultation_app.services;

import com.example.telemedicine_consultation_app.models.Patient;
import com.example.telemedicine_consultation_app.models.RegisterDetails;
import com.example.telemedicine_consultation_app.repository.PatientRepository;
import com.example.telemedicine_consultation_app.repository.RegisterDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class UserDetailsService {
    @Autowired
    private RegisterDetailsRepository userDetailsRepository;

    @Autowired
    private PatientRepository patientRepository;


    public String route(){
        return "Welcome to telemedicine consultation app";
    }

    public List<RegisterDetails> getUsers() {
        return userDetailsRepository.findAll();
    }

    public RegisterDetails getUserById(int userId) {
        return userDetailsRepository.findById(userId).orElse(new RegisterDetails());
    }

//    public String addUser(@RequestBody RegisterDetails userDetails){
//        userDetailsRepository.save(userDetails);
//        return "User added successfully";
//    }

    public String addUser(RegisterDetails userDetails) {
        // Save user first
        RegisterDetails savedUser = userDetailsRepository.save(userDetails);

        // If the role is PATIENT, create and save a Patient entity
        if (savedUser.getRoles().stream().anyMatch(role -> "PATIENT".equalsIgnoreCase(role.getRoleName()))) {
            Patient patient = new Patient();
            patient.setUser(savedUser);
            patient.setPatientName(savedUser.getUserName());
            patient.setGender(savedUser.getGender());
            patient.setDob(savedUser.getDob());
            patient.setMedicalHistory("No history");

            patientRepository.save(patient);
        }


        return "User registered successfully";
    }


    public String updateUser(@RequestBody RegisterDetails userDetails){
        userDetailsRepository.save(userDetails);
        return "User updated Successfully";
    }
    public String deleteUser(@PathVariable int userId){
        userDetailsRepository.deleteById(userId);
        return "User deleted successfully";
    }

}
