import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2SiloSurCSComponent } from './f2-silo-sur-cs.component';

describe('F2SiloSurCSComponent', () => {
  let component: F2SiloSurCSComponent;
  let fixture: ComponentFixture<F2SiloSurCSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2SiloSurCSComponent]
    });
    fixture = TestBed.createComponent(F2SiloSurCSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
