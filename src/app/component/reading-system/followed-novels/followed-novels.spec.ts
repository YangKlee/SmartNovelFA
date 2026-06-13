import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovelReader } from './followed-novels';

describe('NovelReader', () => {
  let component: NovelReader;
  let fixture: ComponentFixture<NovelReader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovelReader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovelReader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
