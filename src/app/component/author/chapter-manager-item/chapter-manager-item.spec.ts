import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterManagerItem } from './chapter-manager-item';

describe('ChapterManagerItem', () => {
  let component: ChapterManagerItem;
  let fixture: ComponentFixture<ChapterManagerItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChapterManagerItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChapterManagerItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
