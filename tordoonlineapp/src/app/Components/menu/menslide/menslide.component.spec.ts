import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenslideComponent } from './menslide.component';

describe('MenslideComponent', () => {
  let component: MenslideComponent;
  let fixture: ComponentFixture<MenslideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenslideComponent]
    });
    fixture = TestBed.createComponent(MenslideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
