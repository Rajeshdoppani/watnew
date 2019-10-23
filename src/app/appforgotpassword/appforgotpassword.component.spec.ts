import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppforgotpasswordComponent } from './appforgotpassword.component';

describe('AppforgotpasswordComponent', () => {
  let component: AppforgotpasswordComponent;
  let fixture: ComponentFixture<AppforgotpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppforgotpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppforgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
