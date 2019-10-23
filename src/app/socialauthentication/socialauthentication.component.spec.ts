import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialauthenticationComponent } from './socialauthentication.component';

describe('SocialauthenticationComponent', () => {
  let component: SocialauthenticationComponent;
  let fixture: ComponentFixture<SocialauthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialauthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialauthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
