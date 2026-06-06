import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChapter } from './create-chapter';

describe('CreateChapter', () => {
  let component: CreateChapter;
  let fixture: ComponentFixture<CreateChapter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateChapter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateChapter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
