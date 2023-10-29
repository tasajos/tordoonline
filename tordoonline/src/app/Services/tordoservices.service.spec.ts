import { TestBed } from '@angular/core/testing';

import { TordoservicesService } from './tordoservices.service';

describe('TordoservicesService', () => {
  let service: TordoservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TordoservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
