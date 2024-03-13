import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2Horno2EnergiaComponent } from './f2-horno2-energia.component';

describe('F2Horno2EnergiaComponent', () => {
  let component: F2Horno2EnergiaComponent;
  let fixture: ComponentFixture<F2Horno2EnergiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2Horno2EnergiaComponent]
    });
    fixture = TestBed.createComponent(F2Horno2EnergiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
