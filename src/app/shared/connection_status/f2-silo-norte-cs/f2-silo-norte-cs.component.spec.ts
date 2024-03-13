import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2SiloNorteCSComponent } from './f2-silo-norte-cs.component';

describe('F2SiloNorteCSComponent', () => {
  let component: F2SiloNorteCSComponent;
  let fixture: ComponentFixture<F2SiloNorteCSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2SiloNorteCSComponent]
    });
    fixture = TestBed.createComponent(F2SiloNorteCSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
