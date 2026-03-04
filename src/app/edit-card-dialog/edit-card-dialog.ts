import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TDevice } from '../models/device.models';
import { TSensor } from '../models/sensor.mode';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TCard } from '../models/card.model';
import { DeviceForm } from '../device-form/device-form';
import { SensorForm } from '../sensor-form/sensor-form';

@Component({
  selector: 'app-edit-card-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    DeviceForm,
    SensorForm,
  ],
  templateUrl: './edit-card-dialog.html',
  styleUrl: './edit-card-dialog.scss',
})
export class EditCardDialog {
  readonly data = inject<{ card: TCard }>(MAT_DIALOG_DATA);

  selected = '';
  items = [...this.data.card.items];
  readonly options: Partial<TDevice | TSensor>[] = [{ type: 'device' }, { type: 'sensor' }];

  title = new FormControl(this.data.card.title);

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  addItem(item: TDevice | TSensor) {
    this.items = [...this.items, item];
    this.selected = '';
  }
}
