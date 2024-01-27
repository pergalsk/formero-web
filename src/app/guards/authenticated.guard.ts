import { CanMatchFn } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { inject } from '@angular/core';

export const authenticatedGuard: CanMatchFn = () => {
  return inject(AuthService).isAuthenticated();
};
