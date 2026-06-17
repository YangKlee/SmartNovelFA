import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportNovel } from './report-novel';

describe('ReportNovel', () => {
  let component: ReportNovel;
  let fixture: ComponentFixture<ReportNovel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportNovel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportNovel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
