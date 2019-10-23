import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbuseComponent } from './abuse.component';

describe('AbuseComponent', () => {
  let component: AbuseComponent;
  let fixture: ComponentFixture<AbuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
