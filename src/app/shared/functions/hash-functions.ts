import * as md5 from 'md5';

export const hashString = (str: string): string => {
  return md5(str);
};
