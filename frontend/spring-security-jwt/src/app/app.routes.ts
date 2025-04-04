import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { authGuard } from './authService/auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'user', component: UserComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent }
];
