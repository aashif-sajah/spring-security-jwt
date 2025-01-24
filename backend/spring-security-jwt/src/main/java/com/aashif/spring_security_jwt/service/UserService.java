package com.aashif.spring_security_jwt.service;

import com.aashif.spring_security_jwt.model.Role;
import com.aashif.spring_security_jwt.model.Users;
import com.aashif.spring_security_jwt.repository.RoleRepo;
import com.aashif.spring_security_jwt.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService
{
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private RoleRepo roleRepo;

    public Users registerNewUser(Users users)
    {
        Role role = roleRepo.findById("User").get();
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        users.setRoles(roles);
        users.setUserPassword(getEncodedPassword(users.getUserPassword()));
        return userRepo.save(users);
    }

    public String getEncodedPassword(String password)
    {
        return bCryptPasswordEncoder.encode(password);
    }
}
