import { TestBed } from '@angular/core/testing';

import { Webe3AuthService } from './webe3-auth.service';

describe('Webe3AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Webe3AuthService = TestBed.get(Webe3AuthService);
    expect(service).toBeTruthy();
  });
});
