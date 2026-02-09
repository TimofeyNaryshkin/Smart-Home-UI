import { Component, computed, input, linkedSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TCard } from '../models/card.model';
import { Device } from '../device/device';
import { Sensor } from '../sensor/sensor';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, Device, Sensor, MatSlideToggleModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  data = input.required<TCard>();

  isDeviceGroup = computed(() => {
    const devices = this.data().items.filter((i) => i.type === 'device');
    return devices.length >= 2;
  });

  isGroupActive = linkedSignal(() => {
    if (this.isDeviceGroup()) {
      const devices = this.data().items.filter((i) => i.type === 'device');
      return devices.some((d) => d.state === true);
    }
    return false;
  }); 

  toggleIsGroupActive() {
    this.isGroupActive.update((val) => !val)
  }
}
