import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AwsConnectService } from './aws-connect.service';

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

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
  providedIn: 'root',
})
export class LocalResourceService {
  constructor(private awsService: AwsConnectService) {}

  getConstUrls(): any {
    return {
      primary: 'assets/RyanFennessey_logo_black.svg',
      secondary: 'assets/RyanFennessey_logo_white.svg',
      resume: 'https://duckduckgo.com/',
      linkedin: 'https://duckduckgo.com/',
      email: 'mailto:xfennessey@gmail.com',
      videoReelUrl: 'https://duckduckgo.com/',
    };
  }

  getBrandIcons(): Observable<string[]> {
    const brandAlbum = 'static';
    return this.awsService.listObjectsInAlbum(brandAlbum)
      .pipe(
        map((results) => {
          console.log(results);
          return results
          .filter((result: string) => result.indexOf('Company logos/') > -1)
          .map((result: string) => this.generateS3Url([environment.s3.bucketName, result]))
        })
      );
  }

  getHeadshot(): Observable<string> {
    const headshotAlbum = 'static';
    return this.awsService.listObjectsInAlbum(headshotAlbum).pipe(
      map((results) => {
        const img = results.find(
          (item: string) => item.toLowerCase().indexOf('headshot') > -1
        );
        return img ? this.generateS3Url([environment.s3.bucketName, img]) : '';
      })
    );
  }

  private generateS3Url(pathPieces: string[]) {
    pathPieces.unshift(environment.s3.baseUrl);
    console.log(pathPieces.join('/'));
    return pathPieces.join('/');
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
