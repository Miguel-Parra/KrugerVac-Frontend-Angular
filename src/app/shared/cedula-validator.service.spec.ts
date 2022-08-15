import { TestBed } from '@angular/core/testing';

import { CedulaValidatorService } from './cedula-validator.service';

describe('CedulaValidatorService', () => {
  let service: CedulaValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CedulaValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
