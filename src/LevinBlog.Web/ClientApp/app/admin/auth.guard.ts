import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authenticationService.authenticated()
      .map(
      data => {
        if (data) {
          if (localStorage.getItem('currentUser')) {
            return true;
          }
        }
        this.router.navigate(['/**']);
        return false;
      },
      error => {
        this.router.navigate(['/**']);
        return false;
      });
  }
}
