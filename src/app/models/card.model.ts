import { TDevice } from './device.models';
import { TSensor } from './sensor.mode';

export interface TCard {
  id: string;
  title: string;
  layout: 'horizontalLayout' | 'verticalLayout' | 'singleDevice';
  items: (TDevice | TSensor)[];
}
