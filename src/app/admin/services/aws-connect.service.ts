import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CognitoIdentityCredentials, config as AWSConfig } from 'aws-sdk';
import * as DynamoDb from 'aws-sdk/clients/dynamodb';
import * as S3 from 'aws-sdk/clients/s3';
import { from, map, Observable } from 'rxjs';
import { iPage } from 'src/app/shared/interfaces.const';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AwsConnectService {
  // s3;
  // dynamo;

  private pageKeys = ['route', 'type'];

  constructor(private http: HttpClient) {
    // AWSConfig.region = environment.aws.defaultRegion;
    // AWSConfig.credentials = new CognitoIdentityCredentials({
    //   IdentityPoolId: environment.aws.identityPoolId,
    // });
    // AWSConfig.apiVersions = {
    //   dynamodb: '2012-08-10',
    //   s3: '2006-03-01',
    // };

    // this.s3 = new S3({
    //   params: { Bucket: environment.s3.bucketName },
    // });

    // this.dynamo = new DynamoDb({
    //   region: environment.dynamoDb.region,
    // });
  }



  ////
  //// API methods
  ////

  createOrEditPage(pageData: iPage): Observable<any> {
    return this.http.put(environment.apiBaseUrl + 'pages', 
      this.convertPageToDynamoExpression(pageData, 'PUT')).pipe(
      map((response: any) => {
        console.log(response);
        console.log(JSON.parse(response.body));
        const parsedResponse = this.parseAttributes(JSON.parse(response.body).Attributes);
        return parsedResponse;
      })
    );
  }

  deletePage(pageData: iPage): Observable<any> {
    return this.http.delete(environment.apiBaseUrl + 'pages',
      {body: this.convertPageToDynamoExpression(pageData, 'DELETE')}).pipe(
      map((response: any) => {
        console.log(response);
        if (response.errorMessage)
          throw response.errorType + ': ' + response.errorMessage;
        console.log(JSON.parse(response.body));
        const parsedResponse = JSON.parse(response.body);
        return parsedResponse;
      })
    );
  }

  private convertPageToDynamoExpression(pageData: iPage, type: 'PUT' | 'DELETE'): any {
    var dynamoExpression: any = {
      Key: {
        [this.pageKeys[0]]: this.createTypedObj(pageData[this.pageKeys[0]]),
        [this.pageKeys[1]]: this.createTypedObj(pageData[this.pageKeys[1]]),
      }
    }

    if (type === 'PUT') {
      const expressionAttrNames: Record<string, string> = {};
      const expressionAttrVals: Record<string, any> = {};
      var updateExp: string = 'SET ';

      Object.keys(pageData).forEach((key: string) => {
        if (!this.pageKeys.find(k => k === key)) {
          expressionAttrNames['#' + key] = key;
          expressionAttrVals[':' + key] = this.createTypedObj(pageData[key]);
          updateExp += `#${key} = :${key}, `;
        }
      });

      dynamoExpression.ExpressionAttributeNames = expressionAttrNames;
      dynamoExpression.ExpressionAttributeValues = expressionAttrVals;
      dynamoExpression.UpdateExpression = updateExp.slice(0, -2);
    }

    return dynamoExpression;
  }

  // putDynamoObjectByKey(obj: any, dynamoKeyName: string[], dynamoKey: string[], table: string): Observable<any> {
  //   const expressionAttrNames: Record<string, string> = {};
  //   const expressionAttrVals: Record<string, any> = {};
  //   var updateExp: string = 'SET ';

  //   Object.keys(obj).forEach((key: string) => {
  //     if (!dynamoKeyName.find(k => k.localeCompare(key) === 0)) {
  //       expressionAttrNames['#' + key] = key;
  //       expressionAttrVals[':' + key] = this.createTypedObj(obj[key]);
  //       updateExp += `#${key} = :${key}, `;
  //     }
  //   });

  //   console.log(expressionAttrNames);
  //   console.log(expressionAttrVals);
  //   console.log(updateExp.slice(0, -2));

  //   const params = {
  //     Key: {
  //       [dynamoKeyName[0]]: this.createTypedObj(dynamoKey[0]),
  //       [dynamoKeyName[1]]: this.createTypedObj(dynamoKey[1]),
  //     },
  //     TableName: table,

  //     ExpressionAttributeNames: expressionAttrNames,
  //     ExpressionAttributeValues: expressionAttrVals,
  //     UpdateExpression: updateExp.slice(0, -2),
  //     ReturnValues: 'ALL_NEW',
  //   };

  //   return from(this.dynamo.updateItem(params).promise()).pipe(
  //     map((data) => {
  //       const error = data.$response.error;
  //       if (error) throw { message: error.message };

  //       return this.parseAttributes(data.Attributes);
  //     })
  //   );
  // }

  // deleteDynamoObjectByKey(dynamoKeyName: string[], dynamoKey: string[], table: string): Observable<any> {
  //   const params = {
  //     Key: {
  //       [dynamoKeyName[0]]: this.createTypedObj(dynamoKey[0]),
  //       [dynamoKeyName[1]]: this.createTypedObj(dynamoKey[1]),
  //     },
  //     TableName: table,
  //   };

  //   return from(this.dynamo.deleteItem(params).promise()).pipe(
  //     map((data) => {
  //       const error = data.$response.error;
  //       if (error) throw { message: error.message };

  //       return data;
  //     })
  //   );
  // }

  private parseAttributes(attributes: any): any {
    const returnValue: Record<string, any> = {};

    if (attributes) {
      Object.keys(attributes).forEach((key: string) => {
        returnValue[key] = this.parseTypedObj(attributes[key]);
      });
    }

    return returnValue;
  }

  parseTypedObj(typedObj: any): any {
    switch (Object.keys(typedObj)[0]) {
      case 'BOOL':
        return typedObj.BOOL;
      case 'S':
        return typedObj.S;
      case 'SS':
        return typedObj.SS;
      case 'N':
        return parseInt(typedObj.N);
      case 'NS':
        return typedObj.NS.map((v: any) => parseInt(v));
      case 'L':
        return typedObj.L.map((v: any) => this.parseTypedObj(v));
      case 'M':
        const obj: Record<string, any> = {};
        Object.keys(typedObj.M).forEach(key => obj[key] = this.parseTypedObj(typedObj.M[key]))
        return obj;
      default:
        return JSON.parse(typedObj.S);
    }
  }

  createTypedObj(value: any): any {
    var typedObj: any = {};

    switch (typeof value) {
      case 'boolean':
        typedObj.BOOL = value;
        break;
      case 'number':
        if (Number.isNaN(value)) typedObj.N = '0';
        else typedObj.N = value.toString();
        break;
      case 'string':
        typedObj.S = value;
        break;
      case 'object':
        if (value && Array.isArray(value)) {
          if (value.length > 0) {
            switch (typeof value[0]) {
              case 'number':
                typedObj.NS = value.map(v => v.toString());
                break;
              case 'string':
                typedObj.SS = value;
                break;
              case 'object':
                typedObj.L = value.map(v => this.createTypedObj(v));
                break;
            }
          } else {
            typedObj.L = [];
          }
        } else {
          const obj: Record<string, any> = {};
          Object.keys(value).forEach(key => obj[key] = this.createTypedObj(value[key]))
          typedObj.M = obj;
        }
        break;
      default:
        typedObj.S = JSON.stringify(value);
        break;
    }

    return typedObj;
  }



  ////
  //// S3 bucket methods
  ////

  // listDynamicFolders(): Observable<string[]> {
  //   const params = {
  //     Bucket: environment.s3.bucketName,
  //     Delimiter: '/',
  //   };

  //   const requestPromise = this.s3.listObjectsV2(params).promise();

  //   return from(requestPromise).pipe(
  //     map((data) => {
  //       const error = data.$response.error;
  //       if (error) throw { message: error.message };
  //       else {
  //         var folders: string[] = [];
  //         if (data.CommonPrefixes) {
  //           folders = data.CommonPrefixes.map((prefix) => {
  //             if (prefix.Prefix) return prefix.Prefix.replace('/', '');
  //             else return '';
  //           }).filter(
  //             (folderName) => folderName !== 'static' && folderName !== ''
  //           );
  //         }
  //         return folders;
  //       }
  //     })
  //   );
  // }

  // listObjectsInFolder(albumName: string): Observable<string[]> {
  //   var params = {
  //     Bucket: environment.s3.bucketName,
  //     Prefix: albumName,
  //   };

  //   const requestPromise = this.s3.listObjectsV2(params).promise();

  //   return from(requestPromise).pipe(
  //     map((data) => {
  //       const error = data.$response.error;
  //       if (error) throw { message: error.message };
  //       else {
  //         var objects: string[] = [];
  //         if (data.Contents) {
  //           objects = data.Contents.map((content) => {
  //             if (content.Key) return content.Key;
  //             else return '';
  //           }).filter((contentKey) => contentKey !== '');
  //         }
  //         return objects;
  //       }
  //     })
  //   );
  // }

  // findObjectsMatchingPattern(pattern: string): Observable<any[]> {
  //   const params = {
  //     Bucket: environment.s3.bucketName,
  //   };

  //   const requestPromise = this.s3.listObjectsV2(params).promise();

  //   return from(requestPromise).pipe(
  //     map((data) => {
  //       const error = data.$response.error;
  //       if (error) throw { message: error.message };
  //       else {
  //         var contentWithFolderName: any[] = [];
  //         if (data.Contents) {
  //           contentWithFolderName = data.Contents.filter(
  //             (content) =>
  //               content.Key &&
  //               content.Key.toLocaleLowerCase().indexOf(pattern) > -1
  //           ).map((content) => {
  //             return {
  //               url: content.Key,
  //               title: content.Key?.substring(0, content.Key.indexOf('/')),
  //             };
  //           });
  //         }
  //         return contentWithFolderName;
  //       }
  //     })
  //   );
  // }
}
