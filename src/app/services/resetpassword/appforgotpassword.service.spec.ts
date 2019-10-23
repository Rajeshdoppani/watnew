import { TestBed } from '@angular/core/testing';

import { AppforgotpasswordService } from './appforgotpassword.service';

describe('AppforgotpasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppforgotpasswordService = TestBed.get(AppforgotpasswordService);
    expect(service).toBeTruthy();
  });
});
