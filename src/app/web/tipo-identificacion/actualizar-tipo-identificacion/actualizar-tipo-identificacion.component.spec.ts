import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ActualizarTipoIdentificacion } from './actualizar-tipo-identificacion.component';

describe('ActualizarTipoIdentificacion', () => {
  let component: ActualizarTipoIdentificacion;
  let fixture: ComponentFixture<ActualizarTipoIdentificacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarTipoIdentificacion],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: MatDialog, useValue: { open: jasmine.createSpy('open') } },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: '1' }) },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizarTipoIdentificacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
