import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2Horno2Component } from './f2-horno2.component';

describe('F2Horno2Component', () => {
  let component: F2Horno2Component;
  let fixture: ComponentFixture<F2Horno2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2Horno2Component]
    });
    fixture = TestBed.createComponent(F2Horno2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
