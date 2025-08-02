package com.example.telemedicine_consultation_app.repository;

import com.example.telemedicine_consultation_app.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment,Integer> {
    List<Appointment> findByDoctor_DoctorName(String doctorName);

    List<Appointment> findByPatient_PatientName(String patientName);

    Optional<Appointment> findByDoctor_DoctorIdAndPatient_PatientIdAndAppointmentDateAndAppointmentTime(
            Long doctorId, Long patientId, LocalDate appointmentDate, LocalTime appointmentTime
    );

}
