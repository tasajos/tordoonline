import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrutasComponent } from './crutas.component';

describe('CrutasComponent', () => {
  let component: CrutasComponent;
  let fixture: ComponentFixture<CrutasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrutasComponent]
    });
    fixture = TestBed.createComponent(CrutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
