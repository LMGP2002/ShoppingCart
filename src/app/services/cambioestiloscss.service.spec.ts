import { TestBed } from '@angular/core/testing';

import { CambioestiloscssService } from './cambioestiloscss.service';

describe('CambioestiloscssService', () => {
  let service: CambioestiloscssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambioestiloscssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
