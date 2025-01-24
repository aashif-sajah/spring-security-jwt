package com.aashif.spring_security_jwt.util;

import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class JwtUtil
{
    public String getUserNameFromToken(String token)
    {
        return null;
    }

    private <T> T getClaimFromToken(String token, Function<Claims,T> claimFunction)
}
