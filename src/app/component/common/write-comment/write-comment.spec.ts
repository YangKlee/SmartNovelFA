import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteComment } from './write-comment';

describe('WriteComment', () => {
  let component: WriteComment;
  let fixture: ComponentFixture<WriteComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteComment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteComment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
