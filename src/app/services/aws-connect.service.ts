import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import * as S3 from 'aws-sdk/clients/s3';
import { from, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AwsConnectService {
  s3;

  constructor() {
    AWS.config.region = environment.s3.region;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: environment.s3.identityPoolId,
    });

    this.s3 = new S3({
      apiVersion: '2006-03-01',
      params: { Bucket: environment.s3.bucketName },
    });
  }

  listAlbums(): Observable<string[]> {
    const params = {
      Bucket: environment.s3.bucketName,
      Delimiter: '/',
    };

    const requestPromise = this.s3.listObjectsV2(params).promise();

    return from(requestPromise).pipe(
      map(data => {
        const error = data.$response.error;
        if (error) throw { message: error.message };
        else {
          var albums: string[] = [];
          if (data.CommonPrefixes) {
            albums = data.CommonPrefixes.map(prefix => {
              if (prefix.Prefix) return prefix.Prefix.replace('/', '');
              else return '';
            }).filter(albumName => albumName !== 'static' && albumName !== '');
          }
          return albums;
        }
      })
    );
  }

  listObjectsInAlbum(albumName: string): Observable<any> {
    var params = {
      Bucket: environment.s3.bucketName,
      Prefix: albumName,
    };

    const requestPromise = this.s3.listObjectsV2(params).promise();

    return from(requestPromise).pipe(
      map(data => {
        console.log(data);
        const error = data.$response.error;
        if (error) throw { message: error.message };
        else {
          var objects: string[] = [];
          if (data.Contents) {
            objects = data.Contents.map(content => {
              if (content.Key) return content.Key;
              else return '';
            }).filter(contentKey => contentKey !== '');
          }
          return objects;
        }
      })
    );
  }
}
