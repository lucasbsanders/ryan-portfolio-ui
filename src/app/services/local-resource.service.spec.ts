import { TestBed } from '@angular/core/testing';

import { LocalResourceService } from './local-resource.service';

describe('LocalResourceService', () => {
  let service: LocalResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
