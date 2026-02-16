import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthService).getToken();
  const newRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(newRequest);
};
