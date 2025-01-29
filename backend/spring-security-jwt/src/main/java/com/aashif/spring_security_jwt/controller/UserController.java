package com.aashif.spring_security_jwt.controller;

import com.aashif.spring_security_jwt.model.Users;
import com.aashif.spring_security_jwt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController
{
    @Autowired
    private UserService userService;


    @PostMapping("/registerNewUser")
    public Users registerUser(@RequestBody Users users)
    {

        return userService.registerNewUser(users);
    }

    @GetMapping("/forAdmin")
    public String forAdmin()
    {
        return "For admin";
    }

    @GetMapping("/forUser")
    public String forUser()
    {
        return "For user";
    }
}
