import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Distrbus49Component } from './distrbus49.component';

describe('Distrbus49Component', () => {
  let component: Distrbus49Component;
  let fixture: ComponentFixture<Distrbus49Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Distrbus49Component]
    });
    fixture = TestBed.createComponent(Distrbus49Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
