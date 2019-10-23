import { TestBed } from '@angular/core/testing';

import { MyfavouritesService } from './myfavourites.service';

describe('MyfavouritesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyfavouritesService = TestBed.get(MyfavouritesService);
    expect(service).toBeTruthy();
  });
});
