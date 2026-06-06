import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyInfo } from './modify-info';

describe('ModifyInfo', () => {
  let component: ModifyInfo;
  let fixture: ComponentFixture<ModifyInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
