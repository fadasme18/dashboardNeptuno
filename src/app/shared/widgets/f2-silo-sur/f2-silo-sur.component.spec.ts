import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2SiloSurComponent } from './f2-silo-sur.component';

describe('F2SiloSurComponent', () => {
  let component: F2SiloSurComponent;
  let fixture: ComponentFixture<F2SiloSurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2SiloSurComponent]
    });
    fixture = TestBed.createComponent(F2SiloSurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
