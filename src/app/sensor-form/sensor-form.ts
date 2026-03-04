import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { TSensor } from '../models/sensor.mode';

@Component({
  selector: 'app-sensor-form',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './sensor-form.html',
  styleUrl: './sensor-form.scss',
})
export class SensorForm {
  private readonly formBuilder = inject(FormBuilder);
  sensorForm = this.formBuilder.group({
    label: [''],
    icon: [''],
    amount: [0],
    unit: [''],
  });

  itemAdded = output<TSensor>();

  onSubmit() {
    const { label, icon, amount, unit } = this.sensorForm.value;
    if (label && icon && unit && amount !== null && amount !== undefined) {
      this.itemAdded.emit({ type: 'sensor', label, icon, value: { amount, unit } });
    }
    this.sensorForm.reset();
  }
}
