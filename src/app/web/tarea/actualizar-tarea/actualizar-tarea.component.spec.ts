import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ActualizarTarea } from './actualizar-tarea.component';

describe('ActualizarTarea', () => {
  let component: ActualizarTarea;
  let fixture: ComponentFixture<ActualizarTarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarTarea],
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

    fixture = TestBed.createComponent(ActualizarTarea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
