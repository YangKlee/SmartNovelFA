import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageControlHelper } from './page-control-helper';

describe('PageControlHelper', () => {
  let component: PageControlHelper;
  let fixture: ComponentFixture<PageControlHelper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageControlHelper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageControlHelper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
