import { TestBed } from '@angular/core/testing';

import { CarritoProductosService } from './carrito-productos.service';

describe('CarritoProductosService', () => {
  let service: CarritoProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
