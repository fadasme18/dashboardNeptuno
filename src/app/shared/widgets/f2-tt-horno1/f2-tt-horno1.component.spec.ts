import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2TtHorno1Component } from './f2-tt-horno1.component';

describe('F2TtHorno1Component', () => {
  let component: F2TtHorno1Component;
  let fixture: ComponentFixture<F2TtHorno1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2TtHorno1Component]
    });
    fixture = TestBed.createComponent(F2TtHorno1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
