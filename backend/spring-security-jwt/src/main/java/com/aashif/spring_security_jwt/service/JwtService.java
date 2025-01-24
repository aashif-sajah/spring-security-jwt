package com.aashif.spring_security_jwt.service;

import com.aashif.spring_security_jwt.model.JwtRequest;
import com.aashif.spring_security_jwt.model.JwtResponse;
import com.aashif.spring_security_jwt.model.Users;
import com.aashif.spring_security_jwt.repository.UserRepo;
import com.aashif.spring_security_jwt.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService myUserDetailsService;

    @Autowired
    private UserRepo userRepo;

    public JwtResponse createJwtToken(JwtRequest jwtRequest) throws Exception {
        String userName = jwtRequest.getUserName();
        String userPassword = jwtRequest.getUserPassword();
        authenticate(userName, userPassword);
        final UserDetails userDetails = myUserDetailsService.loadUserByUsername(userName);
        String newGeneratedJwtToken = jwtUtil.generateToken(userDetails);
        Users user = userRepo.findById(userName).get();

        return new JwtResponse(user, newGeneratedJwtToken);
    }

    private void authenticate(String userName, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, password));
        } catch (DisabledException e) {
            throw new Exception("User is Disabled");
        } catch (BadCredentialsException e) {
            throw new Exception("Invalid username or password");
        }

    }
}
