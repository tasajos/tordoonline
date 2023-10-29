import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecerxComponent } from './cabecerx.component';

describe('CabecerxComponent', () => {
  let component: CabecerxComponent;
  let fixture: ComponentFixture<CabecerxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CabecerxComponent]
    });
    fixture = TestBed.createComponent(CabecerxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
