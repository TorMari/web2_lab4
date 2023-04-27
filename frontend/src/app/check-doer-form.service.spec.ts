import { TestBed } from '@angular/core/testing';

import { CheckDoerFormService } from './check-doer-form.service';

describe('CheckDoerFormService', () => {
  let service: CheckDoerFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckDoerFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
