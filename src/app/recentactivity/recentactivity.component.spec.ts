import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentactivityComponent } from './recentactivity.component';

describe('RecentactivityComponent', () => {
  let component: RecentactivityComponent;
  let fixture: ComponentFixture<RecentactivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentactivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
