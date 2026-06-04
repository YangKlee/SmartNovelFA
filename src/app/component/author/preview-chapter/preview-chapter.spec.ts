import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewChapter } from './preview-chapter';

describe('PreviewChapter', () => {
  let component: PreviewChapter;
  let fixture: ComponentFixture<PreviewChapter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewChapter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewChapter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
