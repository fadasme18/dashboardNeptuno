import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2TtHorno2CsComponent } from './f2-tt-horno2-cs.component';

describe('F2TtHorno2CsComponent', () => {
  let component: F2TtHorno2CsComponent;
  let fixture: ComponentFixture<F2TtHorno2CsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2TtHorno2CsComponent]
    });
    fixture = TestBed.createComponent(F2TtHorno2CsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
