import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarEditorViewComponent } from './car-editor-view.component';

describe('CarEditorViewComponent', () => {
  let component: CarEditorViewComponent;
  let fixture: ComponentFixture<CarEditorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarEditorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarEditorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
