package com.example.telemedicine_consultation_app.services;
import com.example.telemedicine_consultation_app.models.RegisterDetails;
import com.example.telemedicine_consultation_app.repository.RegisterDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    RegisterDetailsRepository registerDetailsRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        /*
    //3things
    1.Loading data from the database
    2. Setting up the authorities
    3.returning up proper user details
     */
        //step 1
        RegisterDetails user = registerDetailsRepository.findByUserName(username)
                .orElseThrow(()->new RuntimeException("User Not Found"));

        //step 2
        Set<GrantedAuthority> authorities = user.getRoles().stream()
                .map(roles -> new SimpleGrantedAuthority(roles.getRoleName()))
                .collect(Collectors.toSet());
        System.out.println("Username is " + user.getUserName()+"\nPassword is "+ user.getPassword()+"\nAuthority is "+authorities);
        return new User(user.getUserName(), user.getPassword(), authorities);
    }
}