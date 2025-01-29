import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {  UserAuthService} from '../services/user-auth.service';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private authService: UserAuthService, private router:Router) {}


  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.clearRole();
    this.authService.setToken('');
    this.router.navigate(['/login']);
  }

  login(): void {
    this.router.navigate(['/login']);
  }
}
