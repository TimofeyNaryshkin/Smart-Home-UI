import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
    canActivate: [authGuard],
    children: [
      {
        path: ':dashboardId',
        loadComponent: () => import('./tab-switcher/tab-switcher').then((m) => m.TabSwitcher),
        children: [
          {
            path: ':tabId',
            loadComponent: () =>
              import('./tab-content/tab-content').then((m) => m.TabContent),
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found').then((m) => m.NotFound),
  },
];
