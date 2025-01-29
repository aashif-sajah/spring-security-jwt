import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { JwtRequest } from '../models/jwt-request.model';
import { JwtResponse } from '../models/jwt-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  /* authenticate(jwtRequest: JwtRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.baseUrl}/authenticate`, jwtRequest);
  } */

  authenticate(jwtRequest: JwtRequest): Observable<JwtResponse> {
    return this.http
      .post<JwtResponse>(`${this.baseUrl}/authenticate`, jwtRequest)
      .pipe(
        catchError((error) => {
          let errorMessage = 'Unknown error occurred';
          if (error.status === 401) {
            errorMessage = error.error?.message || 'Invalid credentials';
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }
}
