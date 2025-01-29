import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtRequest } from '../models/jwt-request.model';
import { JwtResponse } from '../models/jwt-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:8080';
  private userSubject = new BehaviorSubject<any>(null);
  constructor(private http:HttpClient) { }

  authenticate(jwtRequest: JwtRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.baseUrl}/authenticate`, jwtRequest);
  }

  // Method to set the logged-in user
  setUser(user: any) {
    this.userSubject.next(user);  // Store user in BehaviorSubject
  }

  // Method to retrieve the logged-in user
  getUser() {
    return this.userSubject.asObservable();  // Expose the user as Observable
  }
}
