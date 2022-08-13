import { TestBed } from '@angular/core/testing';

import { ManageReportsHttpService } from './manage-reports-http.service';

describe('ManageReportsService', () => {
  let service: ManageReportsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageReportsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
