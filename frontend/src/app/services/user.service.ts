import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  registerUser(registerData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerData)
      .pipe(catchError(this.handleError));
  }

  logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('email');

    // Make a backend call to clear the JWT cookie
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Logout failed:', error);
        return of(null);
      })
    ).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/isAuthenticated`, { withCredentials: true })
      .pipe(
        catchError(() => of(false))
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again.');
  }


}
