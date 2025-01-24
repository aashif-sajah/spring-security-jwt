package com.aashif.spring_security_jwt.config;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter
{

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

       final String header = request.getHeader("Authorization");
       String username = null;
       String jwtToken = null;

       if (header == null || !header.startsWith("Bearer "))
       {
           jwtToken = header.substring(7);

           try{

           } catch (IllegalArgumentException e) {
               System.out.println("Unable to get jwt token");
           } catch (Throwable e) {
               System.out.println("Jwt token is expired");
           }

       }
    }
}
