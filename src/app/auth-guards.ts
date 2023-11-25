import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import {
  AUTHORIZED_KEY,
  isCacheExpired,
} from './shared/functions/cache-functions';

export const PasswordPage: CanActivateFn | CanActivateChildFn = (
  route,
  state
) => {
  const router: Router = inject(Router);
  const userIsAuth = sessionStorage.getItem(AUTHORIZED_KEY) === 't';

  if (!userIsAuth) {
    return router.parseUrl('/');
  }

  return true;
};

export const NoPasswordPage: CanActivateFn | CanActivateChildFn = (
  route,
  state
) => {
  const router: Router = inject(Router);
  const userIsActuallyAuth = sessionStorage.getItem(AUTHORIZED_KEY) === 't';

  if (userIsActuallyAuth) {
    return router.parseUrl('/portfolio');
  }

  return true;
};
