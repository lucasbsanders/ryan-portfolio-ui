import { TestBed } from '@angular/core/testing';

import { PageReadService } from './page-read.service';

describe('PageReadService', () => {
  let service: PageReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
