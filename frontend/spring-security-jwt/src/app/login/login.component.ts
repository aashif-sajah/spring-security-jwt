import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent
{
  userName: string = '';
  userPassword: string = '';

  onSubmit(){
    console.log('Username: ' + this.userName + ' Password: ' + this.userPassword);
  }
}
