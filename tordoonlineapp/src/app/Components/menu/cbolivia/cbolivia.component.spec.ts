import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CboliviaComponent } from './cbolivia.component';

describe('CboliviaComponent', () => {
  let component: CboliviaComponent;
  let fixture: ComponentFixture<CboliviaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CboliviaComponent]
    });
    fixture = TestBed.createComponent(CboliviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
