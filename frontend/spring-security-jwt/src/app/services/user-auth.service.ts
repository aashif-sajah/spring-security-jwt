import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  public setRole(roles: String []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRole(): { role: string, roleDescription: string }[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
}


  public setToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken') || '';
  }

  public clearRole() {
    localStorage.clear();
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    const roles = this.getRole();
    return !!token && roles.length > 0;
  }
}
