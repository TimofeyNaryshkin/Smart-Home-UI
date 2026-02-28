import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token-interceptor';
import { httpInterceptor } from './interceptors/http-interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { dashboardReducer } from './state/reducers/dashboard.reducer';
import { DashboardEffect } from './state/effects/dashboard.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor, httpInterceptor])),
    provideStore({ dashboard: dashboardReducer }),
    provideEffects([DashboardEffect]),
  ],
};
