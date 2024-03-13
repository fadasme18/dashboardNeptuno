import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2SiloNorteComponent } from './f2-silo-norte.component';

describe('F2SiloNorteComponent', () => {
  let component: F2SiloNorteComponent;
  let fixture: ComponentFixture<F2SiloNorteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2SiloNorteComponent]
    });
    fixture = TestBed.createComponent(F2SiloNorteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
