import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2SiloCoheteCSComponent } from './f2-silo-cohete-cs.component';

describe('F2SiloCoheteCSComponent', () => {
  let component: F2SiloCoheteCSComponent;
  let fixture: ComponentFixture<F2SiloCoheteCSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2SiloCoheteCSComponent]
    });
    fixture = TestBed.createComponent(F2SiloCoheteCSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
