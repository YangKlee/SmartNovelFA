import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorComment } from './author-comment';

describe('AuthorComment', () => {
  let component: AuthorComment;
  let fixture: ComponentFixture<AuthorComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorComment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorComment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
