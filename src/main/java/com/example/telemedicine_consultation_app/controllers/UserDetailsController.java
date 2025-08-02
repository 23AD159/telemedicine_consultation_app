package com.example.telemedicine_consultation_app.controllers;

import com.example.telemedicine_consultation_app.models.Appointment;
import com.example.telemedicine_consultation_app.models.RegisterDetails;
import com.example.telemedicine_consultation_app.repository.AppointmentRepository;
import com.example.telemedicine_consultation_app.services.AppointmentService;
import com.example.telemedicine_consultation_app.services.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserDetailsController {

    @Autowired
    UserDetailsService userDetailsService;

    //@PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    @GetMapping("/")
    public String route(){
        return userDetailsService.route();
    }

    @GetMapping("/users")
    //@PreAuthorize("hasAnyRole('ADMIN','DOCTOR')")
    public List<RegisterDetails> getUser() {
        return userDetailsService.getUsers();
    }

    @GetMapping("/users/{userId}")
    public RegisterDetails getUser(@PathVariable int userId) {
        return userDetailsService.getUserById(userId);
    }

    @PostMapping("/add")
    public String addUser(@RequestBody RegisterDetails userDetails){
        return userDetailsService.addUser(userDetails);
    }

    @PutMapping("/{userId}")
    public String updateUser(@RequestBody RegisterDetails userDetails, @PathVariable int userId) {
        userDetails.setUserId(userId);
        return userDetailsService.updateUser(userDetails);
    }

    @DeleteMapping("/{userId}")
    public String deleteUser(@PathVariable int userId){
        return userDetailsService.deleteUser(userId);
    }


}
