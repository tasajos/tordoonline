import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrbusComponent } from './distrbus.component';

describe('DistrbusComponent', () => {
  let component: DistrbusComponent;
  let fixture: ComponentFixture<DistrbusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistrbusComponent]
    });
    fixture = TestBed.createComponent(DistrbusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
