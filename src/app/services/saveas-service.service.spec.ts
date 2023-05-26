import { TestBed } from '@angular/core/testing';

import { SaveasServiceService } from './saveas-service.service';

describe('SaveasServiceService', () => {
  let service: SaveasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
