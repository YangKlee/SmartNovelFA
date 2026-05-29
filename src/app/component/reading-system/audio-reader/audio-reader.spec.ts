import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioReader } from './audio-reader';

describe('AudioReader', () => {
  let component: AudioReader;
  let fixture: ComponentFixture<AudioReader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioReader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioReader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
