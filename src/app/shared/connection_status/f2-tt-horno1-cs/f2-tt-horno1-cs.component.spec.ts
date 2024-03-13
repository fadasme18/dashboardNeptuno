import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2TtHorno1CsComponent } from './f2-tt-horno1-cs.component';

describe('F2TtHorno1CsComponent', () => {
  let component: F2TtHorno1CsComponent;
  let fixture: ComponentFixture<F2TtHorno1CsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2TtHorno1CsComponent]
    });
    fixture = TestBed.createComponent(F2TtHorno1CsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
