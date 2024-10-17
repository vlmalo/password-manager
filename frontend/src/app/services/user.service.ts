import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
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
          this.saveUserData(response); // Use the saveUserData method
        }),
        catchError(this.handleError)
      );
  }

  isAuthenticated(): boolean {
    return !!this.getUserData(); // Check if user data exists in local storage
  }

  getUserDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  registerUser(formData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, formData)
      .pipe(catchError(this.handleError));
  }

  saveUserData(user: any): void {
    localStorage.setItem('userData', JSON.stringify(user)); // Save user data to local storage
  }

  getUserData(): any {
    return JSON.parse(localStorage.getItem('userData') || '{}'); // Retrieve user data from local storage
  }

  addPassword(passwordData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/passwords`, passwordData, { withCredentials: true });
  }

  updatePassword(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/passwords/${id}`, data, { withCredentials: true });
  }

  getPasswords(): Observable<any> {
    return this.http.get(`${this.apiUrl}/passwords`, { withCredentials: true });
  }

  logout() {
    return this.http.post('http://localhost:8080/api/users/logout', {}).pipe(
      catchError((error) => {
        console.error('Error logging out:', error);
        return throwError(error);
      })
    ).subscribe(
      () => {
        localStorage.removeItem('userData');
        console.log('Logout successful');
      },
      (error) => {
        console.error('Logout failed', error);
      }
    );
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
