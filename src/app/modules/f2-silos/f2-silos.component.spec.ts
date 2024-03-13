import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2SilosComponent } from './f2-silos.component';

describe('F2SilosComponent', () => {
  let component: F2SilosComponent;
  let fixture: ComponentFixture<F2SilosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2SilosComponent]
    });
    fixture = TestBed.createComponent(F2SilosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
