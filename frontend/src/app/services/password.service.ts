import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, tap, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private apiUrl = 'http://localhost:8080/api/passwords';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  addPassword(passwordData: any): Observable<any> {
    if (!passwordData.itemName || passwordData.itemName.trim() === '') {
      console.warn('itemName is required. Submission blocked.');
      return throwError('itemName is required.');
    }

    return this.http.post<any>(this.apiUrl, passwordData, {
      headers: this.getAuthHeaders(),
    }).pipe(
      tap(response => console.log('Response from addPassword:', response)),
      catchError(error => {
        console.error('Error adding password:', error);
        return throwError(error);
      })
    );
  }

  deletePassword(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    }).pipe(
      tap(response => console.log('Response from deletePassword:', response)),
      catchError(error => {
        console.error('Error deleting password:', error);
        return throwError(error);
      })
    );
  }



  updatePassword(id: number, passwordData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, passwordData, {
      headers: this.getAuthHeaders(),
    }).pipe(
      tap(response => console.log('Response from updatePassword:', response)),
      catchError(error => {
        console.error('Error updating password:', error);
        return throwError(error);
      })
    );
  }




  getPasswords(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

}
