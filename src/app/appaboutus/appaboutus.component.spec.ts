import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppaboutusComponent } from './appaboutus.component';

describe('AppaboutusComponent', () => {
  let component: AppaboutusComponent;
  let fixture: ComponentFixture<AppaboutusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppaboutusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppaboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
