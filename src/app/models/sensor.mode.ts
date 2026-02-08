export interface Sensor {
  icon: string;
  label: string;
  value: {
    amount: number;
    unit: string;
  };
}
