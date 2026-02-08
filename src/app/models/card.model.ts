import { Device } from './device.models';
import { Sensor } from './sensor.mode';

export interface Card {
  id: string;
  title: string;
  layout: 'horizontalLayout' | 'verticalLayout';
  items: Device | Sensor[];
}
