import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserAuthService } from '../services/user-auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserAuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']); // Redirect to login page
    alert('You must be logged in to access this page');
    return false;
  }
};
