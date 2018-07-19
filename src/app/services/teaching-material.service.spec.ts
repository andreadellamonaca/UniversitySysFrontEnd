import { TestBed, inject } from '@angular/core/testing';

import { TeachingMaterialService } from './teaching-material.service';

describe('TeachingMaterialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeachingMaterialService]
    });
  });

  it('should be created', inject([TeachingMaterialService], (service: TeachingMaterialService) => {
    expect(service).toBeTruthy();
  }));
});
