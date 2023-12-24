import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubusComponent } from './menubus.component';

describe('MenubusComponent', () => {
  let component: MenubusComponent;
  let fixture: ComponentFixture<MenubusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenubusComponent]
    });
    fixture = TestBed.createComponent(MenubusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
