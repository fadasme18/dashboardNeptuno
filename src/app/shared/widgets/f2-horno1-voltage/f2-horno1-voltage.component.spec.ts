import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2Horno1VoltageComponent } from './f2-horno1-voltage.component';

describe('F2Horno1VoltageComponent', () => {
  let component: F2Horno1VoltageComponent;
  let fixture: ComponentFixture<F2Horno1VoltageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2Horno1VoltageComponent]
    });
    fixture = TestBed.createComponent(F2Horno1VoltageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
