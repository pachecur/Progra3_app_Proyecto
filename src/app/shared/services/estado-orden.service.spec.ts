import { TestBed } from '@angular/core/testing';

import { EstadoOrdenService } from './estado-orden.service';

describe('EstadoOrdenService', () => {
  let service: EstadoOrdenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoOrdenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
