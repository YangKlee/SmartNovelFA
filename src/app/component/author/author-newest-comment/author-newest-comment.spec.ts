import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorNewestComment } from './author-newest-comment';

describe('AuthorNewestComment', () => {
  let component: AuthorNewestComment;
  let fixture: ComponentFixture<AuthorNewestComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorNewestComment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorNewestComment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
