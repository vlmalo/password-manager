import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // If the user is authenticated, redirect them away from the login and register pages
    return this.userService.isAuthenticated().pipe(
      map((authenticated) => {
        if (authenticated) {
          this.router.navigate(['/dashboard']);
          return false; // Prevent access to login/register pages
        }
        return true;
      }),
      catchError(() => {
        return of(true);
      })
    );
  }
}
