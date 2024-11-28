import { Injectable } from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {interval, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData: any;

  setUserData(data: any) {
    this.userData = data;
  }

  constructor(private userService: UserService, private router: Router) {
    // Periodically check if the user is authenticated
    interval(180000).pipe( // every 3 minutes
      switchMap(() => this.userService.isAuthenticated())
    ).subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
      }
    });
  }
}
