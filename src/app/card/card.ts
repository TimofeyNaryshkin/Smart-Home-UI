import { Component, computed, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TCard } from '../models/card.model';
import { Device } from '../device/device';
import { Sensor } from '../sensor/sensor';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TDevice } from '../models/device.models';
import { Highlight } from '../directives/highlight';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, Device, Sensor, MatSlideToggleModule, Highlight],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  data = model.required<TCard>();

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
