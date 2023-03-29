import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from "@angular/router";
import { AuthGuard } from './core/guards/auth.guard';

export const APP_ROUTING: Routes = [
  {
    path: 'login',
    canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(route, state)],
    loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent),
  },

  {
    path: '',
    canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(route, state)],
    loadComponent: () => import('./pages/chat/chat.component').then(c => c.ChatComponent)
  },
]
