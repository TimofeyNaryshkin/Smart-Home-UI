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
import { ApiService } from '../services/api-service';
import { toSignal } from '@angular/core/rxjs-interop';

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
  ],
  templateUrl: './edit-card-dialog.html',
  styleUrl: './edit-card-dialog.scss',
})
export class EditCardDialog {
  readonly data = inject<{ card: TCard }>(MAT_DIALOG_DATA);
  private readonly apiService = inject(ApiService);

  readonly availableEntities = toSignal(this.apiService.getDevices(), { initialValue: [] });

  selected: TDevice | TSensor | null = null;
  items = [...this.data.card.items];
  title = new FormControl(this.data.card.title);

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  addItem() {
    if (!this.selected) return;
    this.items = [...this.items, this.selected];
    this.selected = null;
  }
}
