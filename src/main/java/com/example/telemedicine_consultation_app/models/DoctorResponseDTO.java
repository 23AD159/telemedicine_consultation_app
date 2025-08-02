package com.example.telemedicine_consultation_app.models;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class DoctorResponseDTO {
    private int doctorId;
    private String doctorName;
    private String doctorEmail;
    private String doctorSpecialization;
    private String experience;
    private List<String> availableDays;
    private List<String> availableTimes;
}

