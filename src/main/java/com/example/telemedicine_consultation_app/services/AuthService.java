package com.example.telemedicine_consultation_app.services;

import com.example.telemedicine_consultation_app.jwt.JwtTokenProvider;
import com.example.telemedicine_consultation_app.models.*;
import com.example.telemedicine_consultation_app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

//    @Autowired
//    RegisterRepository registerRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    RegisterDetailsRepository registerDetailsRepository;

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    AdminRepository adminRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private RegisterRepository registerRepository;
    @Autowired
    private RolesRepository rolesRepository;

//    public String addNewUser(UserDetailsDto register) {
//        RegisterDetails registerDetails = new RegisterDetails();
//        registerDetails.setUserId(register.getUserId());
//        registerDetails.setUserName(register.getUserName());
//        registerDetails.setEmail(register.getEmail());
//        registerDetails.setPassword(passwordEncoder.encode(register.getPassword()));
//        registerDetails.setUserName(register.getUserName());
//        Set<Roles> roles = new HashSet<>();
//        for (String roleName : register.getRoleNames()) {
//            Roles role = rolesRepository.findByRoleName(roleName)
//                    .orElseThrow(() -> new RuntimeException("User not found " + roleName));
//            roles.add(role);
//        }
//        registerDetails.setRoles(roles);
//        System.out.println("Registration" + registerDetails);
//        registerDetailsRepository.save(registerDetails);
//
//        return "User added Successfully";
//    }

    public String addNewUser(UserDetailsDto register) {
        RegisterDetails registerDetails = new RegisterDetails();
        registerDetails.setUserId(register.getUserId());
        registerDetails.setUserName(register.getUserName());
        registerDetails.setEmail(register.getEmail());
        registerDetails.setPassword(passwordEncoder.encode(register.getPassword()));
        registerDetails.setUserName(register.getUserName());

        Set<Roles> roles = new HashSet<>();
        for (String roleName : register.getRoleNames()) {
            Roles role = rolesRepository.findByRoleName(roleName)
                    .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));
            roles.add(role);
        }
        registerDetails.setRoles(roles);

        // Save RegisterDetails
        RegisterDetails savedUser = registerDetailsRepository.save(registerDetails);

        // Save corresponding entity based on role
        for (Roles role : savedUser.getRoles()) {
            switch (role.getRoleName().toUpperCase()) {
                case "PATIENT":
                    Patient patient = new Patient();
                    patient.setUser(savedUser);
                    patient.setPatientName(savedUser.getUserName());
                    patientRepository.save(patient);
                    break;

                case "DOCTOR":
                    Doctor doctor = new Doctor();
                    doctor.setDoctorName(savedUser.getUserName());
                    doctor.setDoctorEmail(savedUser.getEmail());
                    doctor.setDoctorPassword(savedUser.getPassword()); // already encoded
                    doctorRepository.save(doctor);
                    break;

                case "ADMIN":
                    Admin admin = new Admin();
                    admin.setAdminName(savedUser.getUserName());
                    admin.setEmail(savedUser.getEmail());
                    admin.setPassword(savedUser.getPassword()); // already encoded
                    admin.setUser(savedUser);
                    adminRepository.save(admin);
                    break;
            }
        }

        return "User registered successfully!";
    }




//    public String authenticate(RegisterDetails login){
//        Authentication authentication =
//                authenticationManager.authenticate(
//                        new UsernamePasswordAuthenticationToken(
//                                login.getUserName(),
//                                login.getPassword()));
//        return jwtTokenProvider.generateToken(authentication);
//    }

    public JwtResponse authenticate(RegisterDetails login) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        login.getUserName(),
                        login.getPassword()));

        String token = jwtTokenProvider.generateToken(authentication);

        // Fetch full user details from DB to get name and role
        RegisterDetails user = registerRepository.findByUserName(login.getUserName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String name = user.getUserName();
        String role = user.getRoles().stream()
                .map(Roles::getRoleName)
                .collect(Collectors.joining(","));

        JwtResponse response = new JwtResponse();
        response.setToken(token);
        response.setUsername(name);
        response.setRoles(role);

        return response;
    }

    public Optional<RegisterDetails> getUserByUserName(String username){
        return registerRepository.findByUserName(username);
    }

    public List<RegisterDetails> getAllEmployees() {
        return registerDetailsRepository.findAll();
    }
}