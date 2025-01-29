import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserAuthService } from '../services/user-auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserAuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // User is logged in, allow access
  } else {
    router.navigate(['/login']); // Redirect to login page
    return false; // Block access
  }
};
