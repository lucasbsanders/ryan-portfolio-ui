import { Injectable } from '@angular/core';

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const iconList = [
  'assets/RyanFennessey_logo_black.svg',
  'assets/RyanFennessey_logo_white.svg',
  'assets/RyanFennessey_logo_black.svg',
  'assets/RyanFennessey_logo_white.svg',
  'assets/RyanFennessey_logo_black.svg',
  'assets/RyanFennessey_logo_white.svg',
  'assets/RyanFennessey_logo_black.svg',
  'assets/RyanFennessey_logo_white.svg',
  'assets/RyanFennessey_logo_black.svg',
  'assets/RyanFennessey_logo_white.svg',
];

@Injectable({
  providedIn: 'root'
})
export class ResourcePathsService {

  constructor() { }

  getConstUrls(): any{
    return {
      primary: 'assets/RyanFennessey_logo_black.svg',
      secondary: 'assets/RyanFennessey_logo_white.svg',
      resume: 'https://duckduckgo.com/',
      linkedin: 'https://duckduckgo.com/',
      email: 'mailto:xfennessey@gmail.com',
      videoReelUrl: 'https://duckduckgo.com/'
    };
  }

  getBrandIcons(): string[] {
    return iconList.slice(0, 6);
  }

  getBooks(): string[][] {
    return [iconList, iconList];
  }

  aboutMeDescription(): string {
    return text;
  }

  servicesDescription(): string {
    return text + ' ' + text;
  }

  booksDescription(): string {
    return text + ' ' + text;
  }

  videoProcessDescription(): string {
    return text + ' ' + text;
  }
}
