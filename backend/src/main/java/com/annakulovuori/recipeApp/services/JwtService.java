package com.annakulovuori.recipeApp.services;

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

    private static final String SECRET_KEY = "ccd87be86ec6814fa303fd1e97faf9a29ee54f227a57a45f07c074f2f2138d3ee1786daba6bdba58b9edefbcd7cc16ee993759c9b79cdfd55a1d15c0a8db8c11276bcccdb5be5d0cccd9d20c7407084398e7b8b3dd19e405f9b474253593a630d5989952b9ed390a1059438e4da4be1a7b220e1ad2f85657c21071f6313e5bae82bcf5db654b8b093a65b531b947c1cbf85dcc88e6356c90f8f419f4f011ccc848fb3af80cb3969773ecf1fe33a918c6c2991ceff6c70e9f2ca3c3aee266bfcd88c6dae5cf8dc1fbcafe22dad5fbff6876886802ce03ca7fd6fcabdfac7e4ee35428cee172a97be00ad9c06b3d6e63d0fb04a4ab558bf5da0dfa91a8a81ebc32";

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


    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
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
