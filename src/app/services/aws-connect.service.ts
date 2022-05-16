import { Injectable } from '@angular/core';
import { CognitoIdentityCredentials, config as AWSConfig } from 'aws-sdk';
import * as DynamoDb from 'aws-sdk/clients/dynamodb';
import * as S3 from 'aws-sdk/clients/s3';
import { from, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AwsConnectService {
  s3;
  dynamo;

  constructor() {
    AWSConfig.region = environment.aws.defaultRegion;
    AWSConfig.credentials = new CognitoIdentityCredentials({
      IdentityPoolId: environment.aws.identityPoolId,
    });
    AWSConfig.apiVersions = {
      dynamodb: '2012-08-10',
      s3: '2006-03-01',
    };

    this.s3 = new S3({
      params: { Bucket: environment.s3.bucketName },
    });

    this.dynamo = new DynamoDb({
      region: environment.dynamoDb.region,
    });
  }

  //// DynamoDB methods

  putAboutMeText(txt: string): Observable<string> {
    const params = {
      Key: {
        title: { S: 'static' },
      },
      TableName: 'ryan-portfolio-dynamodb',

      ExpressionAttributeNames: {
        '#T': 'aboutMe',
      },
      ExpressionAttributeValues: {
        ':t': { S: txt },
      },
      UpdateExpression: "SET #T = :t",
      ReturnValues: "ALL_NEW",
    };

    return from(this.dynamo.updateItem(params).promise())
    .pipe(
      map(data => {
        const error = data.$response.error;
        if (error) throw { message: error.message };

        return data.Attributes && data.Attributes['aboutMe'].S ?
          data.Attributes['aboutMe'].S : '';
      })
    );
  }

  putDisplayObj(obj: any): Observable<any> {
    console.log('put object');
    console.log(obj);

    const expressionAttrNames: Record<string, string> = {};
    const expressionAttrVals: Record<string, any> = {};
    var updateExp: string = 'SET ';

    Object.keys(obj).forEach((key: string, index: number) => {
      var val: any = {};
      if (typeof obj[key] === 'string') val.S = obj[key];
      else if (typeof obj[key] === 'number') val.N = obj[key].toString();
      
      expressionAttrNames[('#' + key)] = key;
      expressionAttrVals[(':' + key)] = val;
      updateExp += `#${key} = :${key}`;
      if (index < Object.keys(obj).length - 1) updateExp += ', ';
    });
    console.log(expressionAttrNames);
    console.log(expressionAttrVals);
    console.log(updateExp);

    const params = {
      Key: {
        title: { S: 'display' },
      },
      TableName: 'ryan-portfolio-dynamodb',

      ExpressionAttributeNames: expressionAttrNames,
      ExpressionAttributeValues: expressionAttrVals,
      UpdateExpression: updateExp,
      ReturnValues: "ALL_NEW",
    };

    //return of({ Text: obj.Text, Num: obj.Num });
    return from(this.dynamo.updateItem(params).promise())
    .pipe(
      map(data => {
        const error = data.$response.error;
        if (error) throw { message: error.message };
        console.log(data);
        return {
          Text: data.Attributes && data.Attributes['Text'].S ?
            data.Attributes['Text'].S : '',
          Num: data.Attributes && data.Attributes['Num'].N ?
            parseInt(data.Attributes['Num'].N) : 0,
        };
      })
    );
  }

  getDisplayObj(): Observable<any> {
    const params = {
      Key: {
        title: { S: 'display' },
      },
      TableName: 'ryan-portfolio-dynamodb',
    };

    // return of({ Text: '', Num: 0 });

    return from(this.dynamo.getItem(params).promise())
    .pipe(
      map((data) => {
        const error = data.$response.error;
        if (error) throw { message: error.message };
        console.log(data);
        return {
          Text: data.Item && data.Item['Text'].S ?
            data.Item['Text'].S : '',
          Num: data.Item && data.Item['Num'].N ?
            parseInt(data.Item['Num'].N) : 0,
        };
      })
    );
  }

  getAboutMeText(): Observable<string> {
    const params = {
      Key: {
        title: { S: 'static' },
      },
      TableName: 'ryan-portfolio-dynamodb',
    };

    return from(this.dynamo.getItem(params).promise())
    .pipe(
      map((data) => {
        const error = data.$response.error;
        if (error) throw { message: error.message };

        return data.Item && data.Item['aboutMe'].S ?
          data.Item['aboutMe'].S : '';
      })
    );
  }


  //// S3 bucket methods

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
              if (content.Key) return content.Key;
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
                url: content.Key,
                title: content.Key?.substring(0, content.Key.indexOf('/')),
              };
            });
          }
          return contentWithFolderName;
        }
      })
    );
  }
}
