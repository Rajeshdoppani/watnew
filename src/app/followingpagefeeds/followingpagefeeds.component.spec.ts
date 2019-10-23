import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingpagefeedsComponent } from './followingpagefeeds.component';

describe('FollowingpagefeedsComponent', () => {
  let component: FollowingpagefeedsComponent;
  let fixture: ComponentFixture<FollowingpagefeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowingpagefeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingpagefeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
