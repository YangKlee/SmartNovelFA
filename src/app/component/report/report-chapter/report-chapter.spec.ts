import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportChapter } from './report-chapter';

describe('ReportChapter', () => {
  let component: ReportChapter;
  let fixture: ComponentFixture<ReportChapter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportChapter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportChapter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
