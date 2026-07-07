import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Heyaa } from './heyaa';

describe('Heyaa', () => {
  let component: Heyaa;
  let fixture: ComponentFixture<Heyaa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Heyaa],
    }).compileComponents();

    fixture = TestBed.createComponent(Heyaa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
