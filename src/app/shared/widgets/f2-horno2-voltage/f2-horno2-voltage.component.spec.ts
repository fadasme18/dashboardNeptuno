import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2Horno2VoltageComponent } from './f2-horno2-voltage.component';

describe('F2Horno2VoltageComponent', () => {
  let component: F2Horno2VoltageComponent;
  let fixture: ComponentFixture<F2Horno2VoltageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2Horno2VoltageComponent]
    });
    fixture = TestBed.createComponent(F2Horno2VoltageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
