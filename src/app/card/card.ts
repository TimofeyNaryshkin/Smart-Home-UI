import { Component, computed, inject, input, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TCard } from '../models/card.model';
import { Device } from '../device/device';
import { Sensor } from '../sensor/sensor';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TDevice } from '../models/device.models';
import { Highlight } from '../directives/highlight';
import { EditMode } from '../services/edit-mode-service';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  imports: [
    MatCardModule,
    Device,
    Sensor,
    MatSlideToggleModule,
    Highlight,
    MatAnchor,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  data = model.required<TCard>();
  details = input.required<{ order: number; length: number }>();
  readonly editModeService = inject(EditMode);

  isDeviceGroup = computed(() => {
    const devices = this.data().items.filter((item) => item.type === 'device');
    return devices.length >= 2;
  });

  isGroupActive = computed(() => {
    if (this.isDeviceGroup()) {
      return this.hasActiveDevice();
    }
    return false;
  });

  hasActiveDevice = computed(() => {
    const devices = this.data().items.filter((item) => item.type === 'device');
    return devices.some((d) => d.state === true);
  });

  isAddButtonDisabled = computed(() => this.details().order === this.details().length);

  toggleIsGroupActive() {
    const newState = !this.isGroupActive();
    const updatedItems = this.data().items.map((item) => {
      return item.type === 'device' ? { ...item, state: newState } : item;
    });
    this.data.update((card) => ({ ...card, items: updatedItems }));
  }

  updateDevice(index: number, updatedDevice: TDevice) {
    const updatedItems = [...this.data().items];
    updatedItems[index] = updatedDevice;
    this.data.update((card) => ({ ...card, items: updatedItems }));
  }
}
