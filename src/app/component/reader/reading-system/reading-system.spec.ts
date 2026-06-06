import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingSystem } from './reading-system';

describe('ReadingSystem', () => {
  let component: ReadingSystem;
  let fixture: ComponentFixture<ReadingSystem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingSystem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingSystem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
