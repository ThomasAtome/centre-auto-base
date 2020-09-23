import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SignBaseViewComponent} from './sign-base-view.component';

describe('SignBaseViewComponent', () => {
  let component: SignBaseViewComponent;
  let fixture: ComponentFixture<SignBaseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignBaseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignBaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
