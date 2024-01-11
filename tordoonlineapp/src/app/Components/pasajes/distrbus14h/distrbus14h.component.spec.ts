import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Distrbus14hComponent } from './distrbus14h.component';

describe('Distrbus14hComponent', () => {
  let component: Distrbus14hComponent;
  let fixture: ComponentFixture<Distrbus14hComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Distrbus14hComponent]
    });
    fixture = TestBed.createComponent(Distrbus14hComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
