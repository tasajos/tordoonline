import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtipsviajeComponent } from './ctipsviaje.component';

describe('CtipsviajeComponent', () => {
  let component: CtipsviajeComponent;
  let fixture: ComponentFixture<CtipsviajeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CtipsviajeComponent]
    });
    fixture = TestBed.createComponent(CtipsviajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
