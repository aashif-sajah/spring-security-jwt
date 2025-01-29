import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserAuthService } from '../services/user-auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgIf],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  message: string = '';

  constructor(
    private userService: UserService,
    public authService: UserAuthService
  ) {}

  // Add these properties to both components
  loading = false;
  currentAction: 'admin' | 'user' | null = null;
  messageType: 'success' | 'error' = 'success';

  // Modified methods for AdminComponent
  getAdminData() {
    if (this.authService.hasRole('ADMIN')) {
      this.loading = true;
      this.currentAction = 'admin';

      this.userService.getAdminData().subscribe({
        next: (data) => {
          this.message = data;
          this.messageType = 'success';
        },
        error: (err) => {
          this.message = err;
          this.messageType = 'error';
        },
        complete: () => {
          this.loading = false;
          this.currentAction = null;
        },
      });
    } else {
      this.message = 'You need admin privileges to access this data';
      this.messageType = 'error';
    }
  }

  getUserData() {
    if (this.authService.hasRole('USER')) {
      this.loading = true;
      this.currentAction = 'user';

      this.userService.getUserData().subscribe({
        next: (data) => {
          this.message = data;
          this.messageType = 'success';
        },
        error: (err) => {
          this.message = err;
          this.messageType = 'error';
        },
        complete: () => {
          this.loading = false;
          this.currentAction = null;
        },
      });
    } else {
      this.message = 'You need user privileges to access this data';
      this.messageType = 'error';
    }
  }
}
