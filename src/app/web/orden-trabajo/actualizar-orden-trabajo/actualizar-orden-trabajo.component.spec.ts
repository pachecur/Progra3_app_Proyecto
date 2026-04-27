import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { ActualizarOrdenTrabajo } from './actualizar-orden-trabajo.component';
import { EmpleadoService } from '../../../shared/services/empleado.service';
import { EstadoOrdenService } from '../../../shared/services/estado-orden.service';
import { TareaService } from '../../../shared/services/tarea.service';
import { OrdenTrabajoService } from '../../../shared/services/orden-trabajo.service';

describe('ActualizarOrdenTrabajo', () => {
  let component: ActualizarOrdenTrabajo;
  let fixture: ComponentFixture<ActualizarOrdenTrabajo>;

  const ordenMock = {
    id_orden_trabajo: 1,
    fecha: '2026-04-20',
    descripcion: 'Orden prueba',
    total_horas: 4,
    estado: 1,
    empleado: { id_empleado: 1, nombre: 'Ana', apellidos: 'López', identificacion: '', telefono: '', correo: '', estado: 1, direccion: '', puesto: '' },
    estado_orden: { id_estado_orden: 1, nombre: 'Abierta' },
    orden_trabajo_tareas: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarOrdenTrabajo],
      providers: [
        provideRouter([]),
        { provide: MatDialog, useValue: { open: jasmine.createSpy('open') } },
        { provide: EmpleadoService, useValue: { Listar: () => of([]) } },
        { provide: EstadoOrdenService, useValue: { Listar: () => of([]) } },
        { provide: TareaService, useValue: { Listar: () => of([]) } },
        {
          provide: OrdenTrabajoService,
          useValue: { consultar: () => of(ordenMock) },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: '1' }) },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizarOrdenTrabajo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
