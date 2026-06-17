import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovelLangeItem } from './novel-lange-item';

describe('NovelLangeItem', () => {
  let component: NovelLangeItem;
  let fixture: ComponentFixture<NovelLangeItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovelLangeItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovelLangeItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
