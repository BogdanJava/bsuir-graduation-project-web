import { TestBed } from '@angular/core/testing';

import { GlobalExceptionHandlingService } from './global-exception-handling.service';

describe('GlobalExceptionHandlingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalExceptionHandlingService = TestBed.get(GlobalExceptionHandlingService);
    expect(service).toBeTruthy();
  });
});
