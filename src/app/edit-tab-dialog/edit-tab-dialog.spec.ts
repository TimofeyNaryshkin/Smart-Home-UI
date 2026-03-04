import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTabDialog } from './edit-tab-dialog';

describe('EditTabDialog', () => {
  let component: EditTabDialog;
  let fixture: ComponentFixture<EditTabDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTabDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTabDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
