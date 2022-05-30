import { TestBed } from '@angular/core/testing';

import { ProjectNavigationService } from './project-navigation.service';

describe('ProjectNavigationService', () => {
  let service: ProjectNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
