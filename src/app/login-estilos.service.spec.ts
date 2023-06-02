import { TestBed } from '@angular/core/testing';

import { LoginEstilosService } from './login-estilos.service';

describe('LoginEstilosService', () => {
  let service: LoginEstilosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginEstilosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
