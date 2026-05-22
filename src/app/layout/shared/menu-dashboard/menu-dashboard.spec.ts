import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDashboard } from './menu-dashboard';

describe('MenuDashboard', () => {
  let component: MenuDashboard;
  let fixture: ComponentFixture<MenuDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
