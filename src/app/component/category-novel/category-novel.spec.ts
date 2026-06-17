import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNovel } from './category-novel';

describe('CategoryNovel', () => {
  let component: CategoryNovel;
  let fixture: ComponentFixture<CategoryNovel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryNovel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryNovel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
