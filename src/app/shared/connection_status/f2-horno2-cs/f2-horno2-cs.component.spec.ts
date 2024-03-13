import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2Horno2CSComponent } from './f2-horno2-cs.component';

describe('F2Horno2CSComponent', () => {
  let component: F2Horno2CSComponent;
  let fixture: ComponentFixture<F2Horno2CSComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2Horno2CSComponent]
    });
    fixture = TestBed.createComponent(F2Horno2CSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
