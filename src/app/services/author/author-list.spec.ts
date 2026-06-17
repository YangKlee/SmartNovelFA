import { TestBed } from '@angular/core/testing';

import { AuthorList } from './author-list';

describe('AuthorList', () => {
  let service: AuthorList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
