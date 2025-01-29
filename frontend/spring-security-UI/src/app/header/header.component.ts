import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {  UserAuthService} from '../services/user-auth.service';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private authService: UserAuthService) {}

  
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.clearRole();
    this.authService.setToken(''); 
  }
  
}