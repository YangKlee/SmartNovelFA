import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitNovel } from './submit-novel';

describe('SubmitNovel', () => {
  let component: SubmitNovel;
  let fixture: ComponentFixture<SubmitNovel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitNovel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitNovel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
