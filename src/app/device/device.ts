import { Component, computed, input, output } from '@angular/core';
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
  dataChange = output<TDevice>();
  isSingle = input.required<boolean>();
  isActive = computed(() => this.data().state);

  toggleDevice() {
    this.dataChange.emit({ ...this.data(), state: !this.data().state });
  }
}
