package com.example.telemedicine_consultation_app;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TelemedicineConsultationAppApplication {
	@Value("${app.jwt-secret}")
	private static String jwtsecret;

	public static void main(String[] args) {
		SpringApplication.run(TelemedicineConsultationAppApplication.class, args);
		System.out.println("JWT Key"+jwtsecret);
	}

}
