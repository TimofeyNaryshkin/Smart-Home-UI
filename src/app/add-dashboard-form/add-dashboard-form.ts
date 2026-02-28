import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api-service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-dashboard-form',
  imports: [MatCardModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './add-dashboard-form.html',
  styleUrl: './add-dashboard-form.scss',
})
export class AddDashboardForm {
  private readonly router = inject(Router);
  private readonly apiService = inject(ApiService);
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
      this.apiService.createDashboard({ id, title, icon }).subscribe((response) => {
        console.log(response)
        this.dialogRef.close();
        this.router.navigate([`/dashboard/${response.id}`]);
      });
    }
  }
}
