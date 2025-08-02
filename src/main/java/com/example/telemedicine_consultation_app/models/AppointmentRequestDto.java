package com.example.telemedicine_consultation_app.models;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class AppointmentRequestDto {
    private int doctorId;
    private int patientId;
    public String appointmentDate; // Format: "2025-08-03"
    public String appointmentTime;

}

