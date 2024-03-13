import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2SiloCoheteComponent } from './f2-silo-cohete.component';

describe('F2SiloCoheteComponent', () => {
  let component: F2SiloCoheteComponent;
  let fixture: ComponentFixture<F2SiloCoheteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2SiloCoheteComponent]
    });
    fixture = TestBed.createComponent(F2SiloCoheteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
