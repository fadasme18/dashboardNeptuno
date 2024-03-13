import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2SiloNorteBarraComponent } from './f2-silo-norte-barra.component';

describe('F2SiloNorteBarraComponent', () => {
  let component: F2SiloNorteBarraComponent;
  let fixture: ComponentFixture<F2SiloNorteBarraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2SiloNorteBarraComponent]
    });
    fixture = TestBed.createComponent(F2SiloNorteBarraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
