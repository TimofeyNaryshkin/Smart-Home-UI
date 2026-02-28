import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DashboardActions } from '../state/actions/dashboard.actions';

@Component({
  selector: 'app-add-dashboard-form',
  imports: [MatCardModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './add-dashboard-form.html',
  styleUrl: './add-dashboard-form.scss',
})
export class AddDashboardForm {
  private readonly store = inject(Store);
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<AddDashboardForm>);

  addDashboardForm = this.formBuilder.group({
    id: ['', [Validators.required, Validators.maxLength(30)]],
    title: ['', [Validators.required, Validators.maxLength(50)]],
    icon: ['', Validators.required],
  });

  onSubmit() {
    const { id, title, icon } = this.addDashboardForm.value;
    if (id && title && icon) {
      this.store.dispatch(DashboardActions.createDashboard({ dashboard: { id, title, icon } }));
      this.dialogRef.close();
    }
  }
}
