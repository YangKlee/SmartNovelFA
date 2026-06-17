import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAvatar } from './change-avatar';

describe('ChangeAvatar', () => {
  let component: ChangeAvatar;
  let fixture: ComponentFixture<ChangeAvatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeAvatar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeAvatar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
