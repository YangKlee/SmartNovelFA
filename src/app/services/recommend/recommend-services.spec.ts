import { TestBed } from '@angular/core/testing';

import { RecommendServices } from './recommend-services';

describe('RecommendServices', () => {
  let service: RecommendServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecommendServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
