package com.example.telemedicine_consultation_app.services;

import com.example.telemedicine_consultation_app.models.AvailableDay;
import com.example.telemedicine_consultation_app.models.AvailableTime;
import com.example.telemedicine_consultation_app.models.Doctor;
import com.example.telemedicine_consultation_app.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public Doctor saveDoctor(Doctor doctor) {

        doctor.setDoctorPassword(passwordEncoder.encode(doctor.getDoctorPassword()));
        //return doctorRepository.save(doctor);
        if (doctor.getAvailableDays() != null) {
            doctor.getAvailableDays().forEach(day -> day.setDoctor(doctor));
        }
        if (doctor.getAvailableTimes() != null) {
            doctor.getAvailableTimes().forEach(time -> time.setDoctor(doctor));
        }

        return doctorRepository.save(doctor);

    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public List<Doctor> getBySpecialization(String doctorSpecialization) {
        return doctorRepository.findByDoctorSpecialization(doctorSpecialization);
    }

    public Doctor updateDoctor(int id, Doctor updatedDoctor) {
        Doctor doctor = doctorRepository.findById(id).orElse(null);
        if (doctor != null) {
            doctor.setDoctorName(updatedDoctor.getDoctorName());
            doctor.setDoctorSpecialization(updatedDoctor.getDoctorSpecialization());
            doctor.setAvailableDays(updatedDoctor.getAvailableDays());
            doctor.setAvailableTimes(updatedDoctor.getAvailableTimes());
            doctor.setExperience(updatedDoctor.getExperience());

            // Only update the password if a new one is provided
            if (updatedDoctor.getDoctorPassword() != null && !updatedDoctor.getDoctorPassword().isEmpty()) {
                doctor.setDoctorPassword(passwordEncoder.encode(updatedDoctor.getDoctorPassword()));
            }

            return doctorRepository.save(doctor);
        }
        return null;
    }

    public void deleteDoctor(int id) {
        doctorRepository.deleteById(id);
    }

    public Doctor getDoctorByUsername(String username) {
        return doctorRepository.findByDoctorName(username);
    }

//    public void updateDoctorAvailability(int doctorId, Set<String> days, Set<String> times) {
//        Doctor doctor = doctorRepository.findById(doctorId)
//                .orElseThrow(() -> new RuntimeException("Doctor not found"));
//
//        // Clear old availability
//        doctor.getAvailableDays().clear();
//        doctor.getAvailableTimes().clear();
//
//        // Convert strings to AvailableDay and AvailableTime entities
//        List<AvailableDay> availableDayEntities = days.stream()
//                .map(day -> {
//                    AvailableDay availableDay = new AvailableDay();
//                    availableDay.setDay(day);
//                    availableDay.setDoctor(doctor);
//                    return availableDay;
//                })
//                .toList();
//
//        List<AvailableTime> availableTimeEntities = times.stream()
//                .map(time -> {
//                    AvailableTime availableTime = new AvailableTime();
//                    availableTime.setTimeSlot(time);
//                    availableTime.setDoctor(doctor);
//                    return availableTime;
//                })
//                .toList();
//
//        // Set new availability
//        List<AvailableDay> days = updatedDoctor.getAvailableDays();
//        if (days != null) {
//            days.forEach(d -> d.setDoctor(doctor));
//            doctor.setAvailableDays(days);
//        }
//
//        List<AvailableTime> times = updatedDoctor.getAvailableTimes();
//        if (times != null) {
//            times.forEach(t -> t.setDoctor(doctor));
//            doctor.setAvailableTimes(times);
//        }
//
//
//        doctorRepository.save(doctor);
//    }
//

    public void updateDoctorAvailability(int doctorId, Set<String> days, Set<String> times) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        // Clear existing availability
        doctor.getAvailableDays().clear();
        doctor.getAvailableTimes().clear();

        // Add new available days
        if (days != null) {
            for (String day : days) {
                AvailableDay availableDay = new AvailableDay();
                availableDay.setDay(day);
                availableDay.setDoctor(doctor);  // IMPORTANT: set back-reference
                doctor.getAvailableDays().add(availableDay);
            }
        }

        // Add new available times
        if (times != null) {
            for (String timeSlot : times) {
                AvailableTime availableTime = new AvailableTime();
                availableTime.setTimeSlot(timeSlot);
                availableTime.setDoctor(doctor);  // IMPORTANT: set back-reference
                doctor.getAvailableTimes().add(availableTime);
            }
        }

        doctorRepository.save(doctor);
    }


}
