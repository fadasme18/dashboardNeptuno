import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2Horno1PotenciaComponent } from './f2-horno1-potencia.component';

describe('F2Horno1PotenciaComponent', () => {
  let component: F2Horno1PotenciaComponent;
  let fixture: ComponentFixture<F2Horno1PotenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2Horno1PotenciaComponent]
    });
    fixture = TestBed.createComponent(F2Horno1PotenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
