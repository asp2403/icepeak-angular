import { TestBed } from '@angular/core/testing';

import { WorkAreaService } from './work-area.service';

describe('ManagementService', () => {
  let service: WorkAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
