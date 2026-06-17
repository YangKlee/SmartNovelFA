import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAuthor } from './change-author';

describe('ChangeAuthor', () => {
  let component: ChangeAuthor;
  let fixture: ComponentFixture<ChangeAuthor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeAuthor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeAuthor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
