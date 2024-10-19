import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  loginUser(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData)
      .pipe(catchError(this.handleError));
  }

  saveToken(token: string): void {
    this.token = token; // Store the token in memory
  }

  getTokens(): string | null {
    return this.token; // Retrieve the token
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError('Something went wrong');
  }

  registerUser(registerData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerData)
      .pipe(catchError(this.handleError));

  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    localStorage.removeItem('email');

  }
}
