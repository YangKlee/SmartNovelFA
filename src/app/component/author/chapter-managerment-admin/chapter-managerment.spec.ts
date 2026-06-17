import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterManagerment } from './chapter-managerment';

describe('ChapterManagerment', () => {
  let component: ChapterManagerment;
  let fixture: ComponentFixture<ChapterManagerment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterManagerment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapterManagerment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
