import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TSensor } from '../models/sensor.mode';
import { FormatSensorValuePipe } from '../pipes/format-sensor-value-pipe';

@Component({
  selector: 'app-sensor',
  imports: [MatIconModule, FormatSensorValuePipe],
  templateUrl: './sensor.html',
  styleUrl: './sensor.scss',
})
export class Sensor {
  data = input.required<TSensor>();
}
