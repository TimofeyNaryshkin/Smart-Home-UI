import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';
import { DashboardStore } from '../services/dashboard-store';

@Component({
  selector: 'app-tab-switcher',
  imports: [MatTabsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
})
export class TabSwitcher {
  private readonly store = inject(DashboardStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly tabs = this.store.tabs;

  constructor() {
    this.route.params
      .pipe(
        map((p) => p['dashboardId']),
        filter(Boolean),
        distinctUntilChanged(),
        switchMap((dashboardId) =>
          this.store.loadDashboard(dashboardId).pipe(
            tap((tabs) => {
              if (!this.route.snapshot.firstChild?.params?.['tabId'] && tabs.length > 0) {
                this.router.navigate([tabs[0].id], {
                  relativeTo: this.route,
                  replaceUrl: true,
                });
              }
            }),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
