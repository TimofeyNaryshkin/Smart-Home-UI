import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import {
  ActivatedRoute, RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, filter, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { DashboardActions } from '../state/actions/dashboard.actions';
import { selectTabs } from '../state/selectors/dashboard.selectors';

@Component({
  selector: 'app-tab-switcher',
  imports: [MatTabsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
})
export class TabSwitcher {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  readonly tabs = toSignal(this.store.select(selectTabs), { initialValue: [] });

  constructor() {
    this.route.params
      .pipe(
        map((p) => p['dashboardId']),
        filter(Boolean),
        distinctUntilChanged(),
        tap((dashboardId) => this.store.dispatch(DashboardActions.loadDashboard({ dashboardId }))),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
