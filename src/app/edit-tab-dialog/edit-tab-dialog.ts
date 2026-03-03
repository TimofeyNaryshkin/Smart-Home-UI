import { Component, inject, Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { uniqueTitleValidator } from '../directives/unique-title.directive';
import { Tab } from '../models/tab.model';

@Component({
  selector: 'app-edit-tab-dialog',
  imports: [MatDialogModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './edit-tab-dialog.html',
  styleUrl: './edit-tab-dialog.scss',
})
export class EditTabDialog {
  readonly data = inject<{ message: string; title?: string; tabsSignal: Signal<Tab[]> }>(
    MAT_DIALOG_DATA,
  );
  readonly title = new FormControl(this.data.title || '', [
    Validators.required,
    Validators.maxLength(50),
    uniqueTitleValidator(this.data.tabsSignal, this.data.title),
  ]);
}
