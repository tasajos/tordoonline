import { TestBed } from '@angular/core/testing';

import { SflotaService } from './sflota.service';

describe('SflotaService', () => {
  let service: SflotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SflotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
