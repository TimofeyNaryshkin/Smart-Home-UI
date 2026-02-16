import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (!authService.isAuth()) {
    const loginPath = router.parseUrl('/login');
    return new RedirectCommand(loginPath, { replaceUrl: true });
  }
  return true;
};
