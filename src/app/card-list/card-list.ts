import { Component, model } from '@angular/core';
import { TCard } from '../models/card.model';
import { Card } from '../card/card';

@Component({
  selector: 'app-card-list',
  imports: [Card],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  cards = model.required<TCard[]>();

  updateCard(index: number, updatedCard: TCard) {
    this.cards.update((cards) => {
      const updatedCards = [...cards];
      updatedCards[index] = updatedCard;
      return updatedCards;
    });
  }
}
