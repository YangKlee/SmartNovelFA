import { TestBed } from '@angular/core/testing';

import { CategoryNovel } from './category-novel';

describe('CategoryNovel', () => {
  let service: CategoryNovel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryNovel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
