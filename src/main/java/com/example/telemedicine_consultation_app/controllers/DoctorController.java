package com.example.telemedicine_consultation_app.controllers;

import com.example.telemedicine_consultation_app.models.*;
import com.example.telemedicine_consultation_app.services.DoctorService;
import com.example.telemedicine_consultation_app.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private PatientService patientService;

    @PostMapping
    public Doctor registerDoctor(@RequestBody Doctor doctor){
        return doctorService.saveDoctor(doctor);
    }

//    @GetMapping("/all")
//    public List<Doctor> getAllDoctors(){
//        return doctorService.getAllDoctors();
//    }

    @GetMapping("/all")
    public List<DoctorResponseDTO> getAllDoctors() {
        return doctorService.getAllDoctors()
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    private DoctorResponseDTO convertToDto(Doctor doctor) {
        List<String> days = doctor.getAvailableDays() != null
                ? doctor.getAvailableDays().stream().map(AvailableDay::getDay).toList()
                : List.of();

        List<String> times = doctor.getAvailableTimes() != null
                ? doctor.getAvailableTimes().stream().map(AvailableTime::getTimeSlot).toList()
                : List.of();

        return new DoctorResponseDTO(
                doctor.getDoctorId(),
                doctor.getDoctorName(),
                doctor.getDoctorEmail(),
                doctor.getDoctorSpecialization(),
                doctor.getExperience(),
                days,
                times
        );
    }


    @GetMapping("/specialization/{specialization}")
    public List<Doctor> getDoctorsBySpecialization(@PathVariable String specialization){
        return doctorService.getBySpecialization( specialization);
    }

    @PutMapping("/{id}")
    public Doctor updateDoctor(@PathVariable int id, @RequestBody Doctor doctor){
        return doctorService.updateDoctor(id, doctor);
    }

    @DeleteMapping("/{id}")
    public void deleteDoctor(@PathVariable int id){
        doctorService.deleteDoctor(id);
    }

    @GetMapping("/by-username/{username}")
    public Doctor getDoctorByUsername(@PathVariable String username) {
        return doctorService.getDoctorByUsername(username);
    }

    @PutMapping("/update/{username}")
    public ResponseEntity<Doctor> updateDoctorByUsername(@PathVariable String username, @RequestBody Doctor updatedDoctor) {
        Doctor existing = doctorService.getDoctorByUsername(username);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        existing.setDoctorName(updatedDoctor.getDoctorName());
        existing.setDoctorEmail(updatedDoctor.getDoctorEmail());
        existing.setDoctorSpecialization(updatedDoctor.getDoctorSpecialization());
        existing.setExperience(updatedDoctor.getExperience());

        return ResponseEntity.ok(doctorService.saveDoctor(existing));
    }

    @GetMapping("/patients")
    public List<Patient> getAllPatients(){
        return patientService.getAllPatients();
    }

//    @PostMapping("/update-availability")
//    public ResponseEntity<String> updateAvailability(@RequestBody AvailabilityDTO dto) {
//        doctorService.updateDoctorAvailability(dto.getDoctorId(), dto.getAvailableDays(), dto.getAvailableTimes());
//        return ResponseEntity.ok("Availability updated successfully.");
//    }

    @PutMapping("/updateAvailability")
    public ResponseEntity<String> updateDoctorAvailability(@RequestBody AvailabilityDTO availabilityDTO) {
        doctorService.updateDoctorAvailability(
                availabilityDTO.getDoctorId(),
                availabilityDTO.getAvailableDays(),
                availabilityDTO.getAvailableTimes()
        );
        return ResponseEntity.ok("Doctor availability updated successfully");
    }

}
