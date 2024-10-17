package com.annakulovuori.recipeApp.services;

import com.annakulovuori.recipeApp.models.Role;
import com.annakulovuori.recipeApp.models.UserEntity;
import com.annakulovuori.recipeApp.repositories.UserRepository;
import com.annakulovuori.recipeApp.security.AuthenticationRequest;
import com.annakulovuori.recipeApp.security.AuthenticationResponse;
import com.annakulovuori.recipeApp.security.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    public AuthenticationResponse register(RegisterRequest request) {
        var user = UserEntity.builder()
                .email(request.getEmail())
                .nickname(request.getNickname())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        // onko spostia ja nikkiä olemassa?? tee
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
    }
}

