import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCreatorViewComponent } from './brand-creator-view.component';

describe('BrandCreatorViewComponent', () => {
  let component: BrandCreatorViewComponent;
  let fixture: ComponentFixture<BrandCreatorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandCreatorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandCreatorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
