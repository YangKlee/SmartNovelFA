import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNovel } from './create-novel';

describe('CreateNovel', () => {
  let component: CreateNovel;
  let fixture: ComponentFixture<CreateNovel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNovel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNovel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
