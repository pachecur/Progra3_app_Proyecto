import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { GuardarEmpleado } from './guardar-empleado.component';
import { TipoIdentificacionService } from '../../../shared/services/tipo-identificacion.service';

describe('GuardarEmpleado', () => {
  let component: GuardarEmpleado;
  let fixture: ComponentFixture<GuardarEmpleado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardarEmpleado],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: MatDialog, useValue: { open: jasmine.createSpy('open') } },
        {
          provide: TipoIdentificacionService,
          useValue: { Listar: () => of([]) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GuardarEmpleado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
