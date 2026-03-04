export interface TSensor {
  id?: string;
  type: 'sensor';
  icon: string;
  label: string;
  value: SensorValue;
}

export interface SensorValue {
  amount: number;
  unit: string;
}
