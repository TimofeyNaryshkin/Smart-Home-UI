import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isRelative = !req.url.startsWith('http://') && !req.url.startsWith('https://');
  const url = isRelative ? `/api${req.url}` : req.url;

  const newReq = req.clone({ url });
  return next(newReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.clearToken();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
};
