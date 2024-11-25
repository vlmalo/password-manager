import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Password} from './password.modal';


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

  addPassword(passwordData: any, masterPassword: string): Observable<any> {
    if (!passwordData.itemName || passwordData.itemName.trim() === '') {
      console.warn('itemName is required. Submission blocked.');
      return throwError('itemName is required.');
    }

    return this.http.post<any>(this.apiUrl, passwordData, {
      headers: this.getAuthHeaders(),
      params: { masterPassword }
    }).pipe(
      tap(response => {
        console.log(`Password entry added successfully.`);
      }),
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
      tap(response => console.log('Password entry deleted successfully.')),
      catchError(error => {
        console.error('Error deleting password:', error);
        return throwError(error);
      })
    );
  }

  updatePassword(id: number, passwordData: any, masterPassword: string): Observable<any> {
    const params = new HttpParams().set('masterPassword', masterPassword);

    return this.http.put(`${this.apiUrl}/${id}`, passwordData, {
      headers: this.getAuthHeaders(),
      params,
    }).pipe(
      tap(response => console.log('Password entry was updated successfully')),
      catchError(error => {
        console.error('Error updating password:', error);
        return throwError(error);
      })
    );
  }



  getPasswords(masterPassword: string): Observable<Password[]> {
    const params = new HttpParams().set('masterPassword', masterPassword);
    return this.http.get<Password[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
      params,
    }).pipe(
      tap(passwords => console.log('Successfully fetched passwords')),
      catchError(error => {
        console.error('Error fetching passwords:', error);
        return throwError(error);
      })
    );
  }
}
