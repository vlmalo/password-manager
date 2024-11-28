import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (state.url === '/login' || state.url === '/register') {
      return of(true);
    }

    // Perform the authentication check for other routes
    return this.userService.isAuthenticated().pipe(
      map((authenticated) => {
        if (authenticated) {
          return true; // Allow access to protected route
        } else {
          this.router.navigate(['/login']); // Redirect to login if not authenticated
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']); // Redirect to login if error occurs
        return of(false); // Deny access
      })
    );
  }
}
