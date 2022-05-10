import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import * as S3 from 'aws-sdk/clients/s3';
import * as DynamoDb from 'aws-sdk/clients/dynamodb';
import { from, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AwsConnectService {
  s3;
  dynamo;

  constructor() {
    console.log('Starting AWS Connect Service');

    AWS.config.region = environment.aws.defaultRegion;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: environment.aws.identityPoolId,
    });
    AWS.config.apiVersions = {
      dynamodb: '2012-08-10',
      s3: '2006-03-01',
    };

    this.s3 = new S3({
      params: { Bucket: environment.s3.bucketName },
    });

    this.dynamo = new DynamoDb({
      region: environment.dynamoDb.region,
    });

    const params = {
      Key: {
        title: { S: 'static' },
      },
      TableName: 'ryan-portfolio-dynamodb',
    };

    from(this.dynamo.getItem(params).promise()).subscribe((data) => {
      if (data.Item) console.log(data.Item['aboutMe'].S);
    });
  }

  listDynamicFolders(): Observable<string[]> {
    const params = {
      Bucket: environment.s3.bucketName,
      Delimiter: '/',
    };

    const requestPromise = this.s3.listObjectsV2(params).promise();

    return from(requestPromise).pipe(
      map((data) => {
        const error = data.$response.error;
        if (error) throw { message: error.message };
        else {
          var folders: string[] = [];
          if (data.CommonPrefixes) {
            folders = data.CommonPrefixes.map((prefix) => {
              if (prefix.Prefix) return prefix.Prefix.replace('/', '');
              else return '';
            }).filter(
              (folderName) => folderName !== 'static' && folderName !== ''
            );
          }
          return folders;
        }
      })
    );
  }

  listObjectsInFolder(albumName: string): Observable<string[]> {
    var params = {
      Bucket: environment.s3.bucketName,
      Prefix: albumName,
    };

    const requestPromise = this.s3.listObjectsV2(params).promise();

    return from(requestPromise).pipe(
      map((data) => {
        const error = data.$response.error;
        if (error) throw { message: error.message };
        else {
          var objects: string[] = [];
          if (data.Contents) {
            objects = data.Contents.map((content) => {
              if (content.Key) return this.generateS3Url(content.Key);
              else return '';
            }).filter((contentKey) => contentKey !== '');
          }
          return objects;
        }
      })
    );
  }

  findObjectsMatchingPattern(pattern: string): Observable<any[]> {
    const params = {
      Bucket: environment.s3.bucketName,
    };

    const requestPromise = this.s3.listObjectsV2(params).promise();

    return from(requestPromise).pipe(
      map((data) => {
        const error = data.$response.error;
        if (error) throw { message: error.message };
        else {
          var contentWithFolderName: any[] = [];
          if (data.Contents) {
            contentWithFolderName = data.Contents.filter(
              (content) =>
                content.Key &&
                content.Key.toLocaleLowerCase().indexOf(pattern) > -1
            ).map((content) => {
              return {
                url: this.generateS3Url(content.Key),
                title: content.Key?.substring(0, content.Key.indexOf('/')),
              };
            });
          }
          return contentWithFolderName;
        }
      })
    );
  }

  private generateS3Url(key: string | undefined) {
    return [environment.s3.baseUrl, environment.s3.bucketName, key].join('/');
  }
}
