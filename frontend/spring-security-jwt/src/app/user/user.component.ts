import { Component, OnInit } from '@angular/core';
import { Users } from '../models/users.model';
import { AuthService } from '../authService/auth.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  user:any;


  constructor(private authService: AuthService) {}
  ngOnInit() {
    // Subscribe to the user observable to retrieve user details
    this.authService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

}
