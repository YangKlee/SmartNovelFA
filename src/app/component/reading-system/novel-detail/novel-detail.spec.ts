import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovelDetail } from './novel-detail';

describe('NovelDetail', () => {
  let component: NovelDetail;
  let fixture: ComponentFixture<NovelDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovelDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovelDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
