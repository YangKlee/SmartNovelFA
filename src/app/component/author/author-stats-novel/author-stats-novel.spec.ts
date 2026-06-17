import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorStatsNovel } from './author-stats-novel';

describe('AuthorStatsNovel', () => {
  let component: AuthorStatsNovel;
  let fixture: ComponentFixture<AuthorStatsNovel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorStatsNovel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorStatsNovel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
