import { RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor (
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const currentUser = this.authService.currentUserInfo;
    const currentUrl = state.url;

    if (currentUrl.includes('login')) {
      if (currentUser) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }

    if (!currentUser) {
      this.router.navigate(['/login']);
      return false;
    }

    return true
  }
}
