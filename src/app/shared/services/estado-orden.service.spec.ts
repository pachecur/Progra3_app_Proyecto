import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { EstadoOrdenService } from './estado-orden.service';

describe('EstadoOrdenService', () => {
  let service: EstadoOrdenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(EstadoOrdenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
