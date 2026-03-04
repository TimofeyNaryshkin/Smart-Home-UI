import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { TDevice } from '../models/device.models';

@Component({
  selector: 'app-device-form',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './device-form.html',
  styleUrl: './device-form.scss',
})
export class DeviceForm {
  private readonly formBuilder = inject(FormBuilder);
  deviceForm = this.formBuilder.group({
    label: [''],
    icon: [''],
  });

  itemAdded = output<TDevice>();

  onSubmit() {
    const { label, icon } = this.deviceForm.value;
    if (label && icon) {
      this.itemAdded.emit({ type: 'device', label, icon, state: false });
    }
    this.deviceForm.reset();
  }
}
