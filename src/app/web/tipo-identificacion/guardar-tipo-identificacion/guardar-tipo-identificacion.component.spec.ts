import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { GuardarTipoIdentificacion } from './guardar-tipo-identificacion.component';

describe('GuardarTipoIdentificacion', () => {
  let component: GuardarTipoIdentificacion;
  let fixture: ComponentFixture<GuardarTipoIdentificacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardarTipoIdentificacion],
      providers: [
        provideRouter([]),
        { provide: MatDialog, useValue: { open: jasmine.createSpy('open') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GuardarTipoIdentificacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
