import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentManager } from './comment-manager';

describe('CommentManager', () => {
  let component: CommentManager;
  let fixture: ComponentFixture<CommentManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
