import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { TCard } from '../models/card.model';
import { Card } from '../card/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-card-dialog',
  imports: [MatDialogModule, MatCardModule, Card, MatButtonModule],
  templateUrl: './add-card-dialog.html',
  styleUrl: './add-card-dialog.scss',
})
export class AddCardDialog {
  readonly cards: TCard[] = [
    {
      id: 'entities',
      title: 'Entities',
      layout: 'verticalLayout',
      items: [
        {
          type: 'sensor',
          icon: 'cyclone',
          label: 'Cyclone',
          value: {
            amount: 52,
            unit: '%',
          },
        },
        {
          type: 'sensor',
          icon: 'electric_bolt',
          label: 'Storm',
          value: {
            amount: 52,
            unit: '%',
          },
        },
        {
          type: 'sensor',
          icon: 'ac_unit',
          label: 'Snow',
          value: {
            amount: 52,
            unit: '%',
          },
        },
      ],
    },
    {
      id: 'entity',
      title: 'Entity',
      layout: 'singleDevice',
      items: [
        {
          type: 'sensor',
          icon: 'cyclone',
          label: 'Cyclone',
          value: {
            amount: 52,
            unit: '%',
          },
        },
      ],
    },
    {
      id: 'glance',
      title: 'Glance',
      layout: 'horizontalLayout',
      items: [
        {
          type: 'sensor',
          icon: 'cyclone',
          label: 'Cyclone',
          value: {
            amount: 52,
            unit: '%',
          },
        },
        {
          type: 'sensor',
          icon: 'electric_bolt',
          label: 'Storm',
          value: {
            amount: 52,
            unit: '%',
          },
        },
        {
          type: 'sensor',
          icon: 'ac_unit',
          label: 'Snow',
          value: {
            amount: 52,
            unit: '%',
          },
        },
      ],
    },
  ];
}
