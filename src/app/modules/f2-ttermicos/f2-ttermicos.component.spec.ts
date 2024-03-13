import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F2TtermicosComponent } from './f2-ttermicos.component';

describe('F2TtermicosComponent', () => {
  let component: F2TtermicosComponent;
  let fixture: ComponentFixture<F2TtermicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [F2TtermicosComponent]
    });
    fixture = TestBed.createComponent(F2TtermicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
