import { TestBed } from '@angular/core/testing';

import { NovelServices } from './novel-services';

describe('NovelServices', () => {
  let service: NovelServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovelServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
