import { TestBed } from '@angular/core/testing';

import { PageEditService } from './page-edit.service';

describe('PageEditService', () => {
  let service: PageEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
