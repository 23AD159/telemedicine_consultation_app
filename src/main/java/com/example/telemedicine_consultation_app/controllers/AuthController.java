package com.example.telemedicine_consultation_app.controllers;

import com.example.telemedicine_consultation_app.models.JwtResponse;
import com.example.telemedicine_consultation_app.models.RegisterDetails;
import com.example.telemedicine_consultation_app.models.UserDetailsDto;
import com.example.telemedicine_consultation_app.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/register")
    public String addNewUser(@RequestBody UserDetailsDto register) {
        return authService.addNewUser(register);
    }

    @GetMapping("/")
    public List<RegisterDetails> getAllUsers() {
        return authService.getAllEmployees();
    }

//    @PostMapping("/login")
//    public String Login(@RequestBody RegisterDetails login) {
//        return authService.authenticate(login);
//    }

    @PostMapping("/login")
    public JwtResponse login(@RequestBody RegisterDetails login) {
        return authService.authenticate(login);
    }

}