import { TestBed, inject } from '@angular/core/testing';

import { StudycourseService } from './studycourse.service';

describe('StudycourseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudycourseService]
    });
  });

  it('should be created', inject([StudycourseService], (service: StudycourseService) => {
    expect(service).toBeTruthy();
  }));
});
