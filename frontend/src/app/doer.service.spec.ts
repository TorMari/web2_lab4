import { TestBed } from '@angular/core/testing';

import { DoerService } from './doer.service';

describe('DoerService', () => {
  let service: DoerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
