import { TestBed } from '@angular/core/testing';

import { ResourcePathsService } from './resource-paths.service';

describe('ResourcePathsService', () => {
  let service: ResourcePathsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourcePathsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
