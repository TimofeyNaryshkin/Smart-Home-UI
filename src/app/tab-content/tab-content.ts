import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DashboardStore } from '../services/dashboard-store';
import { CardList } from '../card-list/card-list';

@Component({
  selector: 'app-tab-content',
  imports: [CardList],
  template: `
    @if (cards()) {
      <app-card-list [cards]="cards()!" />
    }
  `,
})
export class TabContent {
  private readonly store = inject(DashboardStore);
  private readonly route = inject(ActivatedRoute);
  private readonly params = toSignal(this.route.params);

  readonly cards = computed(() => {
    const tabId = this.params()?.['tabId'];
    return this.store.getTab(tabId)?.cards;
  });
}
