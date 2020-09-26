import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsViewComponent } from './brands-view.component';

describe('BrandsViewComponent', () => {
  let component: BrandsViewComponent;
  let fixture: ComponentFixture<BrandsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
