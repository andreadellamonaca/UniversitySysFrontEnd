import { TestBed, inject } from '@angular/core/testing';

import { ReportstatusService } from './reportstatus.service';

describe('ReportstatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportstatusService]
    });
  });

  it('should be created', inject([ReportstatusService], (service: ReportstatusService) => {
    expect(service).toBeTruthy();
  }));
});
