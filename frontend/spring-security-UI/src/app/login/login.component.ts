import { JwtRequest } from './../models/jwt-request.model';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../authService/auth.service';
import { Router } from '@angular/router';
import { JwtResponse } from '../models/jwt-response.model';
import { NgIf } from '@angular/common';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  jwtRequest: JwtRequest = new JwtRequest();

  constructor
    (
      private authService: AuthService,
      private router: Router,
      private userAuthService: UserAuthService
    ) {}

    onSubmit(form: NgForm) {
      if (form.valid) {
          this.authService.authenticate(this.jwtRequest).subscribe({
              next: (jwtResponse: JwtResponse) => {
                  console.log(jwtResponse); // Debugging
                  
                  this.userAuthService.setToken(jwtResponse.jwtToken);
                  this.userAuthService.setRole(jwtResponse.user.roles);
  
                  
                  const roles = this.userAuthService.getRole().map(role => role.role);
  
                  if (roles.includes("ADMIN")) {
                      this.router.navigate(['/admin']);
                  } else if (roles.includes("USER")) {
                      this.router.navigate(['/user']);
                  } else {
                      this.router.navigate(['/']); // Default route
                  }
              },
              error: (err) => {
                  console.error("Authentication failed:", err.getMessage());
              },
              complete: () => {
                  console.log("Authentication request completed.");
              }
          });
      }
  }
  
}
