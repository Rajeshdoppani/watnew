import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyandpolicyComponent } from './privacyandpolicy.component';

describe('PrivacyandpolicyComponent', () => {
  let component: PrivacyandpolicyComponent;
  let fixture: ComponentFixture<PrivacyandpolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacyandpolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyandpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
