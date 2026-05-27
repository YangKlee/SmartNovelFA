import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressRoom } from './press-room';

describe('PressRoom', () => {
  let component: PressRoom;
  let fixture: ComponentFixture<PressRoom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PressRoom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PressRoom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
