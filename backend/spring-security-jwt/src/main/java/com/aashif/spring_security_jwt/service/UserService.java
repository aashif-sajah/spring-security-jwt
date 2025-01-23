package com.aashif.spring_security_jwt.service;

import com.aashif.spring_security_jwt.model.Users;
import com.aashif.spring_security_jwt.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService
{
    @Autowired
    private UserRepo userRepo;

    public Users registerNewUser(Users users)
    {
        return userRepo.save(users);
    }
}
