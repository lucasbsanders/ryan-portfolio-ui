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



  ////
  //// DynamoDB methods
  ////

  getDynamoObjectByKey(dynamoKeyName: any, dynamoKey: string): Observable<any> {
    const params = {
      Key: {
        [dynamoKeyName]: this.createTypedObj(dynamoKey),
      },
      TableName: 'ryan-portfolio-dynamodb',
    };

    // return of({ Text: '', Num: 0 });

    return from(this.dynamo.getItem(params).promise()).pipe(
      map((data) => {
        const error = data.$response.error;
        if (error) throw { message: error.message };

        return this.parseAttributes(data.Item);
      })
    );
  }

  putDynamoObjectByKey(obj: any, dynamoKeyName: any, dynamoKey: any): Observable<any> {
    const expressionAttrNames: Record<string, string> = {};
    const expressionAttrVals: Record<string, any> = {};
    var updateExp: string = 'SET ';

    Object.keys(obj).forEach((key: string) => {
      if (dynamoKeyName.localeCompare(key) !== 0) {
        expressionAttrNames['#' + key] = key;
        expressionAttrVals[':' + key] = this.createTypedObj(obj[key]);
        updateExp += `#${key} = :${key}, `;
      }
    });

    console.log(expressionAttrNames);
    console.log(expressionAttrVals);
    console.log(updateExp.slice(0, -2));

    const params = {
      Key: {
        [dynamoKeyName]: this.createTypedObj(dynamoKey),
      },
      TableName: 'ryan-portfolio-dynamodb',

      ExpressionAttributeNames: expressionAttrNames,
      ExpressionAttributeValues: expressionAttrVals,
      UpdateExpression: updateExp.slice(0, -2),
      ReturnValues: 'ALL_NEW',
    };

    //return of({ Text: obj.Text, Num: obj.Num });
    return from(this.dynamo.updateItem(params).promise()).pipe(
      map((data) => {
        const error = data.$response.error;
        if (error) throw { message: error.message };

        return this.parseAttributes(data.Attributes);
      })
    );
  }

  private parseAttributes(attributes: any): any {
    const returnValue: Record<string, any> = {};

    if (attributes) {
      Object.keys(attributes).forEach((key: string) => {
        returnValue[key] = this.parseTypedObj(attributes[key]);
      });
    }

    return returnValue;
  }

  private parseTypedObj(obj: any): any {
    switch (Object.keys(obj)[0]) {
      case 'S':
        return obj.S;
      case 'N':
        return parseInt(obj.N);
      default:
        return obj.S;
    }
  }

  private createTypedObj(value: any): any {
    var typedObj: any = {};
    switch (typeof value) {
      case 'number':
        console.log('number ' + value);
        if (Number.isNaN(value)) typedObj.N = '0';
        else typedObj.N = value.toString();
        break;
      case 'string':
        console.log('string ' + value);
        typedObj.S = value;
        break;
      default:
        typedObj.S = value;
        break;
    }
    return typedObj;
  }



  ////
  //// S3 bucket methods
  ////

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
