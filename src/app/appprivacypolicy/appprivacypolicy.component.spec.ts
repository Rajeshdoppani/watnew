import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppprivacypolicyComponent } from './appprivacypolicy.component';

describe('AppprivacypolicyComponent', () => {
  let component: AppprivacypolicyComponent;
  let fixture: ComponentFixture<AppprivacypolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppprivacypolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppprivacypolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
