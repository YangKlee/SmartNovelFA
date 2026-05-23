import { TestBed } from '@angular/core/testing';

import { HttpServices } from './http-services';

describe('HttpServices', () => {
  let service: HttpServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
