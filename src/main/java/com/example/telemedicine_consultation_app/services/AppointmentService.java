package com.example.telemedicine_consultation_app.services;

import com.example.telemedicine_consultation_app.controllers.AppointmentController;
import com.example.telemedicine_consultation_app.models.Appointment;
import com.example.telemedicine_consultation_app.models.AppointmentRequestDto;
import com.example.telemedicine_consultation_app.models.Doctor;
import com.example.telemedicine_consultation_app.models.Patient;
import com.example.telemedicine_consultation_app.repository.AppointmentRepository;
import com.example.telemedicine_consultation_app.repository.DoctorRepository;
import com.example.telemedicine_consultation_app.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

//    public Appointment bookAppointment(Appointment appointment) {
//        int doctorId = appointment.getDoctor().getDoctorId();
//        int patientId = appointment.getPatient().getPatientId();
//
//        Doctor doctor = doctorRepository.findById(doctorId)
//                .orElseThrow(() -> new RuntimeException("Doctor not found"));
//        Patient patient = patientRepository.findById(patientId)
//                .orElseThrow(() -> new RuntimeException("Patient not found"));
//
//        appointment.setDoctor(doctor);
//        appointment.setPatient(patient);
//
//        return appointmentRepository.save(appointment);
//    }
public Appointment bookAppointment(AppointmentRequestDto request) {
    Doctor doctor = doctorRepository.findById(request.getDoctorId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctor not found"));

    Patient patient = patientRepository.findById(request.getPatientId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient not found"));

    Appointment appointment = new Appointment();
    appointment.setDoctor(doctor);
    appointment.setPatient(patient);

    // Option A: If you're using appointmentDate and appointmentTime separately
    appointment.setAppointmentDate(LocalDate.parse(request.getAppointmentDate()));
    appointment.setAppointmentTime(LocalTime.parse(request.getAppointmentTime()));

    return appointmentRepository.save(appointment);
}




    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }
}
