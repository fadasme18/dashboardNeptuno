import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2Horno1CSComponent } from './f2-horno1-cs.component';

describe('F2Horno1CSComponent', () => {
  let component: F2Horno1CSComponent;
  let fixture: ComponentFixture<F2Horno1CSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2Horno1CSComponent]
    });
    fixture = TestBed.createComponent(F2Horno1CSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
