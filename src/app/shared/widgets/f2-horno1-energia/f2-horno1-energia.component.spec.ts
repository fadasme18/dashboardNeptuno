import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2Horno1EnergiaComponent } from './f2-horno1-energia.component';

describe('F2Horno1EnergiaComponent', () => {
  let component: F2Horno1EnergiaComponent;
  let fixture: ComponentFixture<F2Horno1EnergiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2Horno1EnergiaComponent]
    });
    fixture = TestBed.createComponent(F2Horno1EnergiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
