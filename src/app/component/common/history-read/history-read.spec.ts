import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryRead } from './history-read';

describe('HistoryRead', () => {
  let component: HistoryRead;
  let fixture: ComponentFixture<HistoryRead>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryRead]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryRead);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
