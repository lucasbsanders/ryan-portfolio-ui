import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { AwsConnectService } from './aws-connect.service';

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const iconList = [
  'assets/siteLogos/RyanFennessey_logo_black.svg',
  'assets/siteLogos/RyanFennessey_logo_white.svg',
  'assets/siteLogos/RyanFennessey_logo_black.svg',
  'assets/siteLogos/RyanFennessey_logo_white.svg',
  'assets/siteLogos/RyanFennessey_logo_black.svg',
  'assets/siteLogos/RyanFennessey_logo_white.svg',
  'assets/siteLogos/RyanFennessey_logo_black.svg',
  'assets/siteLogos/RyanFennessey_logo_white.svg',
  'assets/siteLogos/RyanFennessey_logo_black.svg',
  'assets/siteLogos/RyanFennessey_logo_white.svg',
];

@Injectable({
  providedIn: 'root',
})
export class LocalResourceService {
  constructor(private awsService: AwsConnectService) {
    console.log('Starting Local Resource Service');
  }

  getConstUrls(): any {
    return {
      primary: 'assets/siteLogos/RyanFennessey_logo_black.svg',
      secondary: 'assets/siteLogos/RyanFennessey_logo_white.svg',
      icon: 'assets/siteLogos/RyanFennessey_logo_favicon.svg',
      resume: 'https://duckduckgo.com/',
      linkedin: 'https://duckduckgo.com/',
      email: 'mailto:xfennessey@gmail.com',
      videoReelUrl: 'https://duckduckgo.com/',
    };
  }

  getBrandIcons(): Observable<string[]> {
    const brandAlbum = 'static';
    return this.awsService.listObjectsInFolder(brandAlbum)
      .pipe(
        map((results) => {
          return results
            .filter((result: string) => result.indexOf('Company logos/') > -1)
        })
      );
  }

  getHeadshot(): Observable<string> {
    const headshot = sessionStorage.getItem('headshot');
    if (headshot !== null) {
      console.log('getting headshot from session');
      return of(headshot);
    }

    const headshotAlbum = 'static';
    return this.awsService.listObjectsInFolder(headshotAlbum).pipe(
      map((results) => {
        return <string>results.find(
          (item: string) => item.toLowerCase().indexOf('headshot') > -1
        );
      })
    );
  }

  getBooks(): string[][] {
    return [iconList, iconList, iconList];
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
