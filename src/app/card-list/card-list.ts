import { Component, input } from '@angular/core';
import { TCard } from '../models/card.model';
import { Card } from "../card/card";

@Component({
  selector: 'app-card-list',
  imports: [Card],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  cards = input.required<TCard[]>()
}
