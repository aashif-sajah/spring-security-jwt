import { JwtRequest } from './../models/jwt-request.model';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../authService/auth.service';
import { Router } from '@angular/router';
import { JwtResponse } from '../models/jwt-response.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  jwtRequest: JwtRequest = new JwtRequest();

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.authenticate(this.jwtRequest).subscribe(
        (jwtResponse: JwtResponse) => {
          console.log(jwtResponse.jwtToken);
          this.authService.setUser(jwtResponse.user);
          console.log(this.authService.getUser());
          console.log(jwtResponse.user);
          this.router.navigate(['/user']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
