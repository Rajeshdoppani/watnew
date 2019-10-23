import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptermsandconditionComponent } from './apptermsandcondition.component';

describe('ApptermsandconditionComponent', () => {
  let component: ApptermsandconditionComponent;
  let fixture: ComponentFixture<ApptermsandconditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApptermsandconditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApptermsandconditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
