import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2Horno2PotenciaComponent } from './f2-horno2-potencia.component';

describe('F2Horno2PotenciaComponent', () => {
  let component: F2Horno2PotenciaComponent;
  let fixture: ComponentFixture<F2Horno2PotenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2Horno2PotenciaComponent]
    });
    fixture = TestBed.createComponent(F2Horno2PotenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
