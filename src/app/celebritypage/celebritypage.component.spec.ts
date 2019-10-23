import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebritypageComponent } from './celebritypage.component';

describe('CelebritypageComponent', () => {
  let component: CelebritypageComponent;
  let fixture: ComponentFixture<CelebritypageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelebritypageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelebritypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
