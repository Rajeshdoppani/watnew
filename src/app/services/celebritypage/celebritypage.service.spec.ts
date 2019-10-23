import { TestBed } from '@angular/core/testing';

import { CelebritypageService } from './celebritypage.service';

describe('CelebritypageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CelebritypageService = TestBed.get(CelebritypageService);
    expect(service).toBeTruthy();
  });
});
