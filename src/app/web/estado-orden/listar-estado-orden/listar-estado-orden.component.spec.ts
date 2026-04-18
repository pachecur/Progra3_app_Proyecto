import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ListarEstadoOrden } from './listar-estado-orden.component';

describe('ListarEstadoOrden', () => {
  let component: ListarEstadoOrden;
  let fixture: ComponentFixture<ListarEstadoOrden>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEstadoOrden],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarEstadoOrden);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
