import { TestBed } from '@angular/core/testing';

import { JwtServiceGuard } from './jwt-service.guard';

describe('JwtServiceGuard', () => {
  let guard: JwtServiceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(JwtServiceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
