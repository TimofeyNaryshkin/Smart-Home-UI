import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TDevice } from '../models/device.models';

@Component({
  selector: 'app-device',
  imports: [MatIconModule, MatSlideToggleModule],
  templateUrl: './device.html',
  styleUrl: './device.scss',
})
export class Device {
  data = input.required<TDevice>()
}
