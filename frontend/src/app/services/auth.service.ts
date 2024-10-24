import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData: any;

  setUserData(data: any) {
    this.userData = data;
  }
}
