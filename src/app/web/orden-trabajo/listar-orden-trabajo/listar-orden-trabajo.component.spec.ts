import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ListarOrdenTrabajo } from './listar-orden-trabajo.component';

describe('ListarOrdenTrabajo', () => {
  let component: ListarOrdenTrabajo;
  let fixture: ComponentFixture<ListarOrdenTrabajo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarOrdenTrabajo],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListarOrdenTrabajo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
