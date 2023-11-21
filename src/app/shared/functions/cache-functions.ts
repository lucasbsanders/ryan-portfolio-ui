export const PAGE_SESSION_KEY = 'porfolio-page-cache';
export const PAGE_EXPIRE_KEY = 'portfolio-page-cache-expiration';

export const updateCacheExpiration = (): void => {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  sessionStorage.setItem(PAGE_EXPIRE_KEY, now.toUTCString());
};

export const isCacheExpired = (): boolean => {
  const cacheExpireDate = Date.parse(
    sessionStorage.getItem(PAGE_EXPIRE_KEY) ?? ''
  );
  return (
    !sessionStorage.getItem(PAGE_EXPIRE_KEY) || cacheExpireDate < Date.now()
  );
};
