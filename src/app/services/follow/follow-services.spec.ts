import { TestBed } from '@angular/core/testing';

import { FollowServices } from './follow-services';

describe('FollowServices', () => {
  let service: FollowServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
