import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaflotaComponent } from './listaflota.component';

describe('ListaflotaComponent', () => {
  let component: ListaflotaComponent;
  let fixture: ComponentFixture<ListaflotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaflotaComponent]
    });
    fixture = TestBed.createComponent(ListaflotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
