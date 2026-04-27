import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { GuardarOrdenTrabajo } from './guardar-orden-trabajo.component';
import { EmpleadoService } from '../../../shared/services/empleado.service';
import { EstadoOrdenService } from '../../../shared/services/estado-orden.service';
import { TareaService } from '../../../shared/services/tarea.service';

describe('GuardarOrdenTrabajo', () => {
  let component: GuardarOrdenTrabajo;
  let fixture: ComponentFixture<GuardarOrdenTrabajo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardarOrdenTrabajo],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: MatDialog, useValue: { open: jasmine.createSpy('open') } },
        { provide: EmpleadoService, useValue: { Listar: () => of([]) } },
        { provide: EstadoOrdenService, useValue: { Listar: () => of([]) } },
        { provide: TareaService, useValue: { Listar: () => of([]) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GuardarOrdenTrabajo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
