import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2SiloSurBarraComponent } from './f2-silo-sur-barra.component';

describe('F2SiloSurBarraComponent', () => {
  let component: F2SiloSurBarraComponent;
  let fixture: ComponentFixture<F2SiloSurBarraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2SiloSurBarraComponent]
    });
    fixture = TestBed.createComponent(F2SiloSurBarraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
