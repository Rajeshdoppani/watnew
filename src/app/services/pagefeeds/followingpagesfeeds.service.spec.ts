import { TestBed } from '@angular/core/testing';

import { FollowingpagesfeedsService } from './followingpagesfeeds.service';

describe('FollowingpagesfeedsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FollowingpagesfeedsService = TestBed.get(FollowingpagesfeedsService);
    expect(service).toBeTruthy();
  });
});
