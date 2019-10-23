import { TestBed } from '@angular/core/testing';

import { SEOservicesService } from './seoservices.service';

describe('SEOservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SEOservicesService = TestBed.get(SEOservicesService);
    expect(service).toBeTruthy();
  });
});
