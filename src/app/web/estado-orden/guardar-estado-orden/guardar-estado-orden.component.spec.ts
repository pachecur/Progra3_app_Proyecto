import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { GuardarEstadoOrden } from './guardar-estado-orden.component';

describe('GuardarEstadoOrden', () => {
  let component: GuardarEstadoOrden;
  let fixture: ComponentFixture<GuardarEstadoOrden>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardarEstadoOrden],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: MatDialog, useValue: { open: jasmine.createSpy('open') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GuardarEstadoOrden);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
