import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2Horno1Component } from './f2-horno1.component';

describe('F2Horno1Component', () => {
  let component: F2Horno1Component;
  let fixture: ComponentFixture<F2Horno1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2Horno1Component]
    });
    fixture = TestBed.createComponent(F2Horno1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
