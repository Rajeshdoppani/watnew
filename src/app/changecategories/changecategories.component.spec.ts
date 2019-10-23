import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangecategoriesComponent } from './changecategories.component';

describe('ChangecategoriesComponent', () => {
  let component: ChangecategoriesComponent;
  let fixture: ComponentFixture<ChangecategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangecategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangecategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
