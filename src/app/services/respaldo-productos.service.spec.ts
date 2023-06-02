import { TestBed } from '@angular/core/testing';

import { RespaldoProductosService } from './respaldo-productos.service';

describe('RespaldoProductosService', () => {
  let service: RespaldoProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RespaldoProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
