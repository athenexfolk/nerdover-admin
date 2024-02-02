import { TestBed } from '@angular/core/testing';

import { LessonRepositoryService } from './lesson.repository.service';

describe('LessonRepositoryService', () => {
  let service: LessonRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
