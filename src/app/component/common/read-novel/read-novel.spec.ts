import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadNovel } from './read-novel';

describe('ReadNovel', () => {
  let component: ReadNovel;
  let fixture: ComponentFixture<ReadNovel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadNovel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadNovel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
