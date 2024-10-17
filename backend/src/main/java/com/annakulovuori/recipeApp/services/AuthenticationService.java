package com.annakulovuori.recipeApp.services;

import com.annakulovuori.recipeApp.security.AuthenticationRequest;
import com.annakulovuori.recipeApp.security.AuthenticationResponse;
import com.annakulovuori.recipeApp.security.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    public AuthenticationResponse register(RegisterRequest request) {
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
    }
}

