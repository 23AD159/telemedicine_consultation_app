package com.example.telemedicine_consultation_app.controllers;

import com.example.telemedicine_consultation_app.models.Admin;
import com.example.telemedicine_consultation_app.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping("/create")
    public Admin createAdmin(@RequestBody Admin admin) {
        return adminService.saveAdmin(admin);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Admin admin) {
        Optional<Admin> loggedInAdmin = adminService.loginAdmin(admin.getAdminName(), admin.getPassword());
        if (loggedInAdmin.isPresent()) {
            return ResponseEntity.ok(loggedInAdmin.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid admin name or password");
        }
    }

    @GetMapping("/all")
    public List<Admin> getAllAdmin() {
        return adminService.getAllAdmins();
    }

    @PutMapping("/update/{id}")
    public Admin updateAdmin(@PathVariable int id, @RequestBody Admin admin) {
        return adminService.updateAdmin(id, admin);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteAdmin(@PathVariable int id) {
        adminService.deleteAdminById(id);
    }

    @GetMapping("/get/{id}")
    public Optional<Admin> getAdminById(@PathVariable("id") int id) {
        return adminService.getAdminById(id);
    }
}
