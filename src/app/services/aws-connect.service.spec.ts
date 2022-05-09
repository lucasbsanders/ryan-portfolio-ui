import { TestBed } from '@angular/core/testing';

import { AwsConnectService } from './aws-connect.service';

describe('AwsConnectService', () => {
  let service: AwsConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
