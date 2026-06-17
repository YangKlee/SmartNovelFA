import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowManager } from './follow-manager';

describe('FollowManager', () => {
  let component: FollowManager;
  let fixture: ComponentFixture<FollowManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
