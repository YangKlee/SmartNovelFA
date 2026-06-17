import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorStatsProfile } from './author-stats-profile';

describe('AuthorStatsProfile', () => {
  let component: AuthorStatsProfile;
  let fixture: ComponentFixture<AuthorStatsProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorStatsProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorStatsProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
