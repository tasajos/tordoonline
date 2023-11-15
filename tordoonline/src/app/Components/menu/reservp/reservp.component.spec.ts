import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservpComponent } from './reservp.component';

describe('ReservpComponent', () => {
  let component: ReservpComponent;
  let fixture: ComponentFixture<ReservpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservpComponent]
    });
    fixture = TestBed.createComponent(ReservpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
