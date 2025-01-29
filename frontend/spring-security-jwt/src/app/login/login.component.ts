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
  errorMessage: string = '';
  usernameError: boolean = false;
  passwordError: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userAuthService: UserAuthService
  ) {}

  /* onSubmit(form: NgForm) {
    this.resetErrors();

    if (form.valid) {
      this.authService.authenticate(this.jwtRequest).subscribe({
        next: (jwtResponse: JwtResponse) => {
          this.handleSuccessfulLogin(jwtResponse);
        },
        error: (err) => {
          this.handleLoginError(err);
        },
      });
    }
  } */


    onSubmit(form: NgForm) {
      this.resetErrors();

      if (form.valid) {
        this.authService.authenticate(this.jwtRequest).subscribe({
          next: (jwtResponse: JwtResponse) => {
            this.handleSuccessfulLogin(jwtResponse);
          },
          error: (err) => {
            this.handleLoginError(err.message || 'Login failed');
          }
        });
      }
    }

    private handleLoginError(errorMessage: string) {
      const message = errorMessage.toLowerCase();

      if (message.includes('username')) {
        this.usernameError = true;
        this.errorMessage = 'Invalid username';
      } else if (message.includes('password') || message.includes('credentials')) {
        this.passwordError = true;
        this.errorMessage = 'Invalid credentials';
      } else {
        this.errorMessage = 'Login failed. Please try again.';
      }
    }
    private handleSuccessfulLogin(jwtResponse: JwtResponse) {
    this.userAuthService.setToken(jwtResponse.jwtToken);
    this.userAuthService.setRole(jwtResponse.user.roles);

    const roles = this.userAuthService.getRole().map((role) => role.role);

    if (roles.includes('ADMIN')) {
      this.router.navigate(['/admin']);
    } else if (roles.includes('USER')) {
      this.router.navigate(['/user']);
    } else {
      this.router.navigate(['/']);
    }
  }

  /* private handleLoginError(err: any) {
    // Handle network errors or server down
    if (!err.error) {
      this.errorMessage = 'Network error. Please check your connection.';
      return;
    }

    // Handle HTTP errors
    if (err.status === 401) {
      const errorMessage = err.error?.message?.toLowerCase() || '';

      if (errorMessage.includes('password')) {
        this.passwordError = true;
        this.errorMessage = 'Invalid password';
      } else if (
        errorMessage.includes('username') ||
        errorMessage.includes('user')
      ) {
        this.usernameError = true;
        this.errorMessage = 'Invalid username';
      } else {
        this.errorMessage = 'Invalid credentials';
      }
    } else {
      this.errorMessage =
        'An unexpected error occurred. Please try again later.';
    }
  } */

  private resetErrors() {
    this.errorMessage = '';
    this.usernameError = false;
    this.passwordError = false;
  }
}
