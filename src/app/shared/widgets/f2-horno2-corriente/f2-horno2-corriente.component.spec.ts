import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2Horno2CorrienteComponent } from './f2-horno2-corriente.component';

describe('F2Horno2CorrienteComponent', () => {
  let component: F2Horno2CorrienteComponent;
  let fixture: ComponentFixture<F2Horno2CorrienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2Horno2CorrienteComponent]
    });
    fixture = TestBed.createComponent(F2Horno2CorrienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
