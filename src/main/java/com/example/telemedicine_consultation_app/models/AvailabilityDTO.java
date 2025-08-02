package com.example.telemedicine_consultation_app.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AvailabilityDTO {
    private int doctorId;
    private Set<String> availableDays;
    private Set<String> availableTimes;
}
