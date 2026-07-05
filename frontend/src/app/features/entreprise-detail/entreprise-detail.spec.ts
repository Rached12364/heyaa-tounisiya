import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseDetail } from './entreprise-detail';

describe('EntrepriseDetail', () => {
  let component: EntrepriseDetail;
  let fixture: ComponentFixture<EntrepriseDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepriseDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(EntrepriseDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
