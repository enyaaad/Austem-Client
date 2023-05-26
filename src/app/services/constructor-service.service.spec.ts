import { TestBed } from '@angular/core/testing';

import { ConstructorServiceService } from './constructor-service.service';

describe('ConstructorServiceService', () => {
  let service: ConstructorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstructorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
