import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressHistory } from './progress-history';

describe('ProgressHistory', () => {
  let component: ProgressHistory;
  let fixture: ComponentFixture<ProgressHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
