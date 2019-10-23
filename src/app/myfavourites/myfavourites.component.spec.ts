import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfavouritesComponent } from './myfavourites.component';

describe('MyfavouritesComponent', () => {
  let component: MyfavouritesComponent;
  let fixture: ComponentFixture<MyfavouritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfavouritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
