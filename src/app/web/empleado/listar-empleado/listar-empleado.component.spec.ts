import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ListarEmpleado } from './listar-empleado.component';

describe('ListarEmpleado', () => {
  let component: ListarEmpleado;
  let fixture: ComponentFixture<ListarEmpleado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEmpleado],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarEmpleado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
