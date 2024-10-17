import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, tap, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  loginUser(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData, { withCredentials: true })
      .pipe(
        tap(response => {
          localStorage.setItem('user', JSON.stringify(response));
        }),
        catchError(this.handleError)
      );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }


  getUserDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  registerUser(formData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, formData)
      .pipe(catchError(this.handleError));
  }



  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'error';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
