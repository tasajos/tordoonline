import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerflotaComponent } from './verflota.component';

describe('VerflotaComponent', () => {
  let component: VerflotaComponent;
  let fixture: ComponentFixture<VerflotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerflotaComponent]
    });
    fixture = TestBed.createComponent(VerflotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
