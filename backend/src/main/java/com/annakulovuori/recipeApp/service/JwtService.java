package com.annakulovuori.recipeApp.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY = "secret_key";

    // generate token without extra claims, using generate token with extra claims
    public String generateToken(UserDetails userdetails) {
        return generateToken(new HashMap<>(), userdetails);
    }

    // generate token with extra claims
    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userdetails
    ){
        return Jwts
                .builder()
                .claims(extraClaims)
                .subject(userdetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // expires after a day
                .signWith(getKey())
                .compact();
    }

    // checks username match and expiration date. Also checks secret key through other methods
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    // returns true if token is expired
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }


    //extractUsername actually extracts email now
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extract any claim from claims
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extract all claims from jwt token
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
