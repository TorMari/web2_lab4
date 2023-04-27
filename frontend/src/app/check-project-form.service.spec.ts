import { TestBed } from '@angular/core/testing';

import { CheckProjectFormService } from './check-project-form.service';

describe('CheckProjectFormService', () => {
  let service: CheckProjectFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckProjectFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
