import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2Horno1CorrienteComponent } from './f2-horno1-corriente.component';

describe('F2Horno1CorrienteComponent', () => {
  let component: F2Horno1CorrienteComponent;
  let fixture: ComponentFixture<F2Horno1CorrienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2Horno1CorrienteComponent]
    });
    fixture = TestBed.createComponent(F2Horno1CorrienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
