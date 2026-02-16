import { Pipe, PipeTransform } from '@angular/core';
import { SensorValue } from '../models/sensor.mode';

@Pipe({
  name: 'formatSensorValue',
})
export class FormatSensorValuePipe implements PipeTransform {
  transform({ amount, unit }: SensorValue): string {
    return `${amount} ${unit}`;
  }
}
