import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TCard } from '../models/card.model';
import { Device } from "../device/device";
import { Sensor } from "../sensor/sensor";

@Component({
  selector: 'app-card',
  imports: [MatCardModule, Device, Sensor],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  data = input.required<TCard>()
}
