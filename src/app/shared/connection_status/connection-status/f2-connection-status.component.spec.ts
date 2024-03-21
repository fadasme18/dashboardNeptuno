import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2connectionstatusComponent } from './f2-connection-status.component';

describe('F2TtHorno2CsComponent', () => {
  let component: F2connectionstatusComponent;
  let fixture: ComponentFixture<F2connectionstatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2connectionstatusComponent]
    });
    fixture = TestBed.createComponent(F2connectionstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
