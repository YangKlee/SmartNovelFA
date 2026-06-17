import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderComment } from './reader-comment';

describe('ReaderComment', () => {
  let component: ReaderComment;
  let fixture: ComponentFixture<ReaderComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReaderComment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReaderComment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
