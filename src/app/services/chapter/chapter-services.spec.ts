import { TestBed } from '@angular/core/testing';

import { ChapterServices } from './chapter-services';

describe('ChapterServices', () => {
  let service: ChapterServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChapterServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
