import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovelManager } from './novel-manager';

describe('NovelManager', () => {
  let component: NovelManager;
  let fixture: ComponentFixture<NovelManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovelManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovelManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
