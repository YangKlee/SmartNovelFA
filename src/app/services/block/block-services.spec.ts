import { TestBed } from '@angular/core/testing';

import { BlockServices } from './block-services';

describe('BlockServices', () => {
  let service: BlockServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
