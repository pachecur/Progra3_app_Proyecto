import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { ActualizarEmpleado } from './actualizar-empleado.component';
import { TipoIdentificacionService } from '../../../shared/services/tipo-identificacion.service';
import { EmpleadoService } from '../../../shared/services/empleado.service';

describe('ActualizarEmpleado', () => {
  let component: ActualizarEmpleado;
  let fixture: ComponentFixture<ActualizarEmpleado>;

  const empleadoMock = {
    id_empleado: 1,
    tipo_identificacion: {
      id_tipo_identificacion: 1,
      nombre: 'Cédula',
      mascara: '',
    },
    identificacion: '1',
    nombre: 'Juan',
    apellidos: 'Pérez',
    telefono: '8888',
    correo: 'juan@test.com',
    estado: 1,
    direccion: 'Dir',
    puesto: 'Dev',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarEmpleado],
      providers: [
        provideRouter([]),
        { provide: MatDialog, useValue: { open: jasmine.createSpy('open') } },
        {
          provide: TipoIdentificacionService,
          useValue: { Listar: () => of([{ id_tipo_identificacion: 1, nombre: 'Cédula', mascara: '' }]) },
        },
        {
          provide: EmpleadoService,
          useValue: { consultar: () => of(empleadoMock) },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: '1' }) },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizarEmpleado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
