import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfimDeleteRepype } from './confim-delete-repype';

describe('ConfimDeleteRepype', () => {
  let component: ConfimDeleteRepype;
  let fixture: ComponentFixture<ConfimDeleteRepype>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfimDeleteRepype]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfimDeleteRepype);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
