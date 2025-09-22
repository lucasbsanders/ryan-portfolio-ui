import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AUTHORIZED_KEY } from './shared/functions/cache-functions';
import { ENABLE_PASSWORD_PROTECTION_FLAG } from 'src/app/shared/flags.const';

export const PasswordPage: CanActivateFn | CanActivateChildFn = (
  route,
  state
) => {
  
  const router: Router = inject(Router);
  const userIsAuth = localStorage.getItem(AUTHORIZED_KEY) === 't';

  if (!userIsAuth && ENABLE_PASSWORD_PROTECTION_FLAG) {
    return router.parseUrl('/');
  }

  return true;
};

export const NoPasswordPage: CanActivateFn | CanActivateChildFn = (
  route,
  state
) => {
  
  const router: Router = inject(Router);
  const userIsAuth = localStorage.getItem(AUTHORIZED_KEY) === 't';

  if (userIsAuth || !ENABLE_PASSWORD_PROTECTION_FLAG) {
    return router.parseUrl('/portfolio');
  }

  return true;
};
