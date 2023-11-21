var md5 = require('md5');

export const hashString = (str: string): string => {
  return md5(str);
};
