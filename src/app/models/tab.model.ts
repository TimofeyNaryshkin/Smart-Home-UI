import { TCard } from './card.model';

export interface Tab {
  id: string;
  title: string;
  cards: TCard[];
}
