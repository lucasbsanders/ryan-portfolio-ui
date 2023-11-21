import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { isCacheExpired } from './shared/functions/cache-functions';

export const AUTHORIZED_KEY = 'portfolio-access-authorized';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
  const router: Router = inject(Router);
  const authorized =
    sessionStorage.getItem(AUTHORIZED_KEY) === 't' && !isCacheExpired();

  if (!authorized) router.navigate(['/']);
  return of(!!authorized);
};
