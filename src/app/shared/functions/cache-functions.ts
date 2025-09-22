import { environment } from "src/environments/environment";

export const PAGES_LIST_LS_KEY = 'portfolio-pages-cache';
export const PAGES_LIST_UPDATED_LS_KEY = 'portfolio-pages-cache-updated';
export const AUTHORIZED_KEY = 'portfolio-access-authorized';

export const setPagesListCache = (serializedPages: string): void => {
  const now = new Date();
  localStorage.setItem(PAGES_LIST_UPDATED_LS_KEY, now.toUTCString());
  localStorage.setItem(PAGES_LIST_LS_KEY, serializedPages);
};

export const isPagesListCacheExpired = (): boolean => {
  let cacheIsExpired = false;

  if (localStorage.getItem(PAGES_LIST_UPDATED_LS_KEY)) {
    const cacheExpirationDate = new Date(
      Date.parse(localStorage.getItem(PAGES_LIST_UPDATED_LS_KEY) ?? '')
    );
    cacheExpirationDate.setMilliseconds(
      cacheExpirationDate.getUTCMilliseconds() + environment.cacheExpirationTimeMs
    );

    cacheIsExpired = cacheExpirationDate.valueOf() < Date.now();
  }

  //console.log('cacheIsExpired result: ' + cacheIsExpired);

  return cacheIsExpired;
};
