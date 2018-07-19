import { TestBed, inject } from '@angular/core/testing';

import { TeachingService } from './teaching.service';

describe('TeachingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeachingService]
    });
  });

  it('should be created', inject([TeachingService], (service: TeachingService) => {
    expect(service).toBeTruthy();
  }));
});
