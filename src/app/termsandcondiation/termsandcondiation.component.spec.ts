import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsandcondiationComponent } from './termsandcondiation.component';

describe('TermsandcondiationComponent', () => {
  let component: TermsandcondiationComponent;
  let fixture: ComponentFixture<TermsandcondiationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsandcondiationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsandcondiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
