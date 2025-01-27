import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

export const routes: Routes = [
  {path:'home',component: HomeComponent},
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path:'user',component: UserComponent},
  {path:'admin', component: AdminComponent},
  {path:'login', component: LoginComponent},
  {path:'forbidden', component: ForbiddenComponent}
];
