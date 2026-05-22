import { TestBed } from '@angular/core/testing';

import { RatingServices } from './rating-services';

describe('RatingServices', () => {
  let service: RatingServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
