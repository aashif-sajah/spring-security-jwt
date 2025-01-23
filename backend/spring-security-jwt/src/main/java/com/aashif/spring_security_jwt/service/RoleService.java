package com.aashif.spring_security_jwt.service;

import com.aashif.spring_security_jwt.model.Role;
import com.aashif.spring_security_jwt.repository.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class RoleService
{
    @Autowired
    private RoleRepo roleRepo;

    public Role createRole(Role role)
    {
        return roleRepo.save(role);
    }
}
