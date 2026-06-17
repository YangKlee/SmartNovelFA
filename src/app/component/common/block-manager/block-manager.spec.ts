import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockManager } from './block-manager';

describe('BlockManager', () => {
  let component: BlockManager;
  let fixture: ComponentFixture<BlockManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
