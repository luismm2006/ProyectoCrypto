import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/Services/authService';

export const guardAdmin: CanActivateFn = (route, state) => {
  const service = inject(AuthService);
  const router = inject(Router);

  if(service.user()?.role == 'admin'){
    return true;
  }
  router.navigate(['/login']);
  return false;
};
