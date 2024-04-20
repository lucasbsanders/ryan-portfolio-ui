export const PAGE_SESSION_KEY = 'portfolio-page-cache';
export const PAGE_EXPIRE_KEY = 'portfolio-page-cache-expiration';
export const AUTHORIZED_KEY = 'portfolio-access-authorized';

export const updateCacheExpiration = (): void => {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  localStorage.setItem(PAGE_EXPIRE_KEY, now.toUTCString());
};

export const isCacheExpired = (): boolean => {
  const cacheExpireDate = Date.parse(
    localStorage.getItem(PAGE_EXPIRE_KEY) ?? ''
  );

  const cacheExpired =
    !localStorage.getItem(PAGE_EXPIRE_KEY) || cacheExpireDate < Date.now();
  if (cacheExpired) {
  }
  return (
    !localStorage.getItem(PAGE_EXPIRE_KEY) || cacheExpireDate < Date.now()
  );
};
