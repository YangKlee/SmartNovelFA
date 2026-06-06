import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNovel } from './card-novel';

describe('CardNovel', () => {
  let component: CardNovel;
  let fixture: ComponentFixture<CardNovel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNovel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNovel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
