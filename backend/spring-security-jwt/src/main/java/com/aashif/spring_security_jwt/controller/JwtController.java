package com.aashif.spring_security_jwt.controller;

import com.aashif.spring_security_jwt.model.JwtRequest;
import com.aashif.spring_security_jwt.model.JwtResponse;
import com.aashif.spring_security_jwt.service.JwtService;
import com.aashif.spring_security_jwt.service.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class JwtController
{
    @Autowired
    private JwtService jwtService;

    @PostMapping("/authenticate")
    public JwtResponse createJwtToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        return jwtService.createJwtToken(jwtRequest);
    }
}
