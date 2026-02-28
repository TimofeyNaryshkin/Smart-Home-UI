import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDashboardForm } from './add-dashboard-form';

describe('AddDashboardForm', () => {
  let component: AddDashboardForm;
  let fixture: ComponentFixture<AddDashboardForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDashboardForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDashboardForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
