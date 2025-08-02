package com.example.telemedicine_consultation_app.services;

import com.example.telemedicine_consultation_app.models.Admin;
import com.example.telemedicine_consultation_app.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Admin saveAdmin(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(int id) {
        return adminRepository.findById(id);
    }

    public String deleteAdminById(int id) {
        adminRepository.deleteById(id);
        return "Admin with ID" + id + " has been deleted";
    }

    public Admin updateAdmin(int id, Admin adminData) {
        Admin admin = adminRepository.findById(id).orElseThrow();
        admin.setAdminName(adminData.getAdminName());
        admin.setEmail(adminData.getEmail());
        admin.setUser(adminData.getUser());
        if (adminData.getPassword() != null && !adminData.getPassword().isEmpty()) {
            admin.setPassword(passwordEncoder.encode(adminData.getPassword()));
        }

        return adminRepository.save(admin);
    }
    public Optional<Admin> loginAdmin(String adminName, String rawPassword) {
        Optional<Admin> optionalAdmin = adminRepository.findByAdminName(adminName);
        if (optionalAdmin.isPresent()) {
            Admin admin = optionalAdmin.get();
            if (passwordEncoder.matches(rawPassword, admin.getPassword())) {
                return Optional.of(admin);
            }
        }
        return Optional.empty();
    }
}
