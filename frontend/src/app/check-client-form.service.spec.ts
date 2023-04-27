import { TestBed } from '@angular/core/testing';

import { CheckClientFormService } from './check-client-form.service';

describe('CheckClientFormService', () => {
  let service: CheckClientFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckClientFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
