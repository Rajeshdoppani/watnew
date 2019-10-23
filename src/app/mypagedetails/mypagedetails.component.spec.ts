import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypagedetailsComponent } from './mypagedetails.component';

describe('MypagedetailsComponent', () => {
  let component: MypagedetailsComponent;
  let fixture: ComponentFixture<MypagedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypagedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypagedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
