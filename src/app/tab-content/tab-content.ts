import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardList } from '../card-list/card-list';
import { Store } from '@ngrx/store';
import { selectTabs } from '../state/selectors/dashboard.selectors';

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
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  private readonly tabs = toSignal(this.store.select(selectTabs));
  private readonly params = toSignal(this.route.params);

  readonly cards = computed(() => {
    const tabId = this.params()?.['tabId']
    return this.tabs()?.find((tab) => tab.id === tabId)?.cards
  })
}
