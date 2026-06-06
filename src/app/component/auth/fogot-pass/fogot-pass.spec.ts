import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FogotPass } from './fogot-pass';

describe('FogotPass', () => {
  let component: FogotPass;
  let fixture: ComponentFixture<FogotPass>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FogotPass]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FogotPass);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
