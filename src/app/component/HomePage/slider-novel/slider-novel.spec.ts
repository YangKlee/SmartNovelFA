import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderNovel } from './slider-novel';

describe('SliderNovel', () => {
  let component: SliderNovel;
  let fixture: ComponentFixture<SliderNovel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderNovel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderNovel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
