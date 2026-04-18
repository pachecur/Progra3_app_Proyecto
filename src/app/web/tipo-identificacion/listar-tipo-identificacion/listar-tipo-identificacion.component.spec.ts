import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ListarTipoIdentificacion } from './listar-tipo-identificacion.component';

describe('ListarTipoIdentificacion', () => {
  let component: ListarTipoIdentificacion;
  let fixture: ComponentFixture<ListarTipoIdentificacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarTipoIdentificacion],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarTipoIdentificacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
