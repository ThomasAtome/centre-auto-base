import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCreatorViewComponent } from './car-creator-view.component';

describe('CarCreatorViewComponent', () => {
  let component: CarCreatorViewComponent;
  let fixture: ComponentFixture<CarCreatorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarCreatorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCreatorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
