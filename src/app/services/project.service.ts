import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AwsConnectService } from './aws-connect.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private awsService: AwsConnectService) {
    console.log('Starting Project Service');
  }

  getProjectPreviews(): Observable<any[]> {
    return this.awsService.findObjectsMatchingPattern('thumbnail');
  }
}
