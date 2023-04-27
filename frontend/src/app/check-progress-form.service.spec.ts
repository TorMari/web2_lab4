import { TestBed } from '@angular/core/testing';

import { CheckProgressFormService } from './check-progress-form.service';

describe('CheckProgressFormService', () => {
  let service: CheckProgressFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckProgressFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
