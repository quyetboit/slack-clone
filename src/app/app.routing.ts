import { Routes } from "@angular/router";

export const APP_ROUTING: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent)
  },

  {
    path: '',
    loadComponent: () => import('./pages/chat/chat.component').then(c => c.ChatComponent)
  },
]
