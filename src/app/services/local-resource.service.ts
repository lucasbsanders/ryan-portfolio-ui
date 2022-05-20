import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalResourceService {

  constructor() {}

  getConstUrls(): any {
    return {
      primary: 'assets/siteLogos/RyanFennessey_logo_black.svg',
      secondary: 'assets/siteLogos/RyanFennessey_logo_white.svg',
      icon: 'assets/siteLogos/RyanFennessey_logo_favicon.svg',
    };
  }

}
