import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/Services/authService';

export const guardAuth: CanActivateFn = (route, state) => {
  const service = inject(AuthService);
  const router = inject(Router);

  if(service.user()){
    return true;
  }
  router.navigate(['/login']);
  return false;
};
