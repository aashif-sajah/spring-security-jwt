import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAdminData(): Observable<string> {
    return this.http.get(`${this.baseUrl}/forAdmin`, { responseType: 'text' }).pipe(
      catchError(error => of(this.handleError(error)))
    );
  }

  getUserData(): Observable<string> {
    return this.http.get(`${this.baseUrl}/forUser`, { responseType: 'text' }).pipe(
      catchError(error => of(this.handleError(error)))
    );
  }

  private handleError(error: any): string {
    return error.error?.message || error.message || 'Unknown error occurred';
  }
}
