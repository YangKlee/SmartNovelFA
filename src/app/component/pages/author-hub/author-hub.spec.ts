import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorHub } from './author-hub';

describe('AuthorHub', () => {
  let component: AuthorHub;
  let fixture: ComponentFixture<AuthorHub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorHub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorHub);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
