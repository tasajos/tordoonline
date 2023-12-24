import { TestBed } from '@angular/core/testing';

import { SusuarioService } from './susuario.service';

describe('SusuarioService', () => {
  let service: SusuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SusuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
