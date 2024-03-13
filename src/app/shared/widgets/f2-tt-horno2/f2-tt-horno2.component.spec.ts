import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2TtHorno2Component } from './f2-tt-horno2.component';

describe('F2TtHorno2Component', () => {
  let component: F2TtHorno2Component;
  let fixture: ComponentFixture<F2TtHorno2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2TtHorno2Component]
    });
    fixture = TestBed.createComponent(F2TtHorno2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
