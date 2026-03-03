import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const httpInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isRelative = !request.url.startsWith('http://') && !request.url.startsWith('https://');
  const url = isRelative ? `http://localhost:3004/api${request.url}` : request.url;

  const newRequest = request.clone({ url });
  return next(newRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.clearToken();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
};
