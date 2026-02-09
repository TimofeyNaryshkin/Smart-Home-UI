import { Component, input, linkedSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TDevice } from '../models/device.models';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-device',
  imports: [MatIconModule, MatSlideToggleModule, MatButtonModule],
  templateUrl: './device.html',
  styleUrl: './device.scss',
})
export class Device {
  data = input.required<TDevice>();
  isSingle = input.required<boolean>();
  isActive = linkedSignal(() => this.data().state)
  toggleDevice() {
    this.isActive.update((val) => !val)
  }
}
