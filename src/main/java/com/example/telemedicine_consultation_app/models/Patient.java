package com.example.telemedicine_consultation_app.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int patientId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private RegisterDetails user;

    private String patientName;
    private String gender;
    private String dob;
    private String medicalHistory;
}
