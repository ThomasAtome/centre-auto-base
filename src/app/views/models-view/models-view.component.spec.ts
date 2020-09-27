import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsViewComponent } from './models-view.component';

describe('ModelsViewComponent', () => {
  let component: ModelsViewComponent;
  let fixture: ComponentFixture<ModelsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
