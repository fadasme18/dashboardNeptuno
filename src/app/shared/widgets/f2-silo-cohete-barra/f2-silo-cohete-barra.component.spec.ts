import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2SiloCoheteBarraComponent } from './f2-silo-cohete-barra.component';

describe('F2SiloCoheteBarraComponent', () => {
  let component: F2SiloCoheteBarraComponent;
  let fixture: ComponentFixture<F2SiloCoheteBarraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2SiloCoheteBarraComponent]
    });
    fixture = TestBed.createComponent(F2SiloCoheteBarraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
