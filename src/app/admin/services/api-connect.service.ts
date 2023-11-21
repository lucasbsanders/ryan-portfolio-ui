import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { iPage } from 'src/app/shared/interfaces.const';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminAPIService {
  private pageKeys = ['route', 'type'];

  constructor(private httpClient: HttpClient) {}

  ////
  //// API methods
  ////

  createOrEditPage(pageData: iPage): Observable<any> {
    return this.httpClient
      .put(
        environment.apiBaseUrl + 'pages',
        this.convertPageToDynamoExpression(pageData, 'PUT')
      )
      .pipe(
        map((response: any) => {
          const attributes = JSON.parse(response.body).Attributes;
          const parsedResponse: Record<string, any> = {};

          if (attributes) {
            Object.keys(attributes).forEach((key: string) => {
              parsedResponse[key] = this.parseTypedObj(attributes[key]);
            });
          }

          return parsedResponse;
        })
      );
  }

  deletePage(pageData: iPage): Observable<any> {
    return this.httpClient
      .delete(environment.apiBaseUrl + 'pages', {
        body: this.convertPageToDynamoExpression(pageData, 'DELETE'),
      })
      .pipe(
        map((response: any) => {
          if (response.errorMessage)
            throw response.errorType + ': ' + response.errorMessage;

          const parsedResponse = JSON.parse(response.body);
          return parsedResponse;
        })
      );
  }

  //
  // Helpers
  //

  private convertPageToDynamoExpression(
    pageData: iPage,
    type: 'PUT' | 'DELETE'
  ): any {
    var dynamoExpression: any = {
      Key: {
        [this.pageKeys[0]]: this.createTypedObj(pageData[this.pageKeys[0]]),
        [this.pageKeys[1]]: this.createTypedObj(pageData[this.pageKeys[1]]),
      },
    };

    if (type === 'PUT') {
      const expressionAttrNames: Record<string, string> = {};
      const expressionAttrVals: Record<string, any> = {};
      var updateExp: string = 'SET ';

      Object.keys(pageData).forEach((key: string) => {
        if (!this.pageKeys.find((k) => k === key)) {
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
        Object.keys(typedObj.M).forEach(
          (key) => (obj[key] = this.parseTypedObj(typedObj.M[key]))
        );
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
                typedObj.NS = value.map((v) => v.toString());
                break;
              case 'string':
                typedObj.SS = value;
                break;
              case 'object':
                typedObj.L = value.map((v) => this.createTypedObj(v));
                break;
            }
          } else {
            typedObj.L = [];
          }
        } else {
          const obj: Record<string, any> = {};
          Object.keys(value).forEach(
            (key) => (obj[key] = this.createTypedObj(value[key]))
          );
          typedObj.M = obj;
        }
        break;
      default:
        typedObj.S = JSON.stringify(value);
        break;
    }

    return typedObj;
  }
}
