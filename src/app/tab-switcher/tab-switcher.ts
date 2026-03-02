import { Component, computed, inject, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, filter, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { DashboardActions, DashboardApiActions } from '../state/actions/dashboard.actions';
import { selectTabs } from '../state/selectors/dashboard.selectors';
import { DashboardList } from '../services/dashboard-list-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { Tab } from '../models/tab.model';

@Component({
  selector: 'app-tab-switcher',
  imports: [MatTabsModule, RouterLink, RouterLinkActive, RouterOutlet, MatButtonModule, MatIcon],
  templateUrl: './tab-switcher.html',
  styleUrl: './tab-switcher.scss',
})
export class TabSwitcher {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly dashboardListService = inject(DashboardList);
  private readonly dialog = inject(MatDialog);
  private originalTabs: Tab[] = [];

  readonly tabs = toSignal(this.store.select(selectTabs), { initialValue: [] });
  readonly dashboardId = toSignal<string>(this.route.params.pipe(map((p) => p['dashboardId'])));
  private readonly dashboards = toSignal(this.dashboardListService.dashboards$, {
    initialValue: [],
  });
  readonly currentDashboard = computed(() =>
    this.dashboards().find((dashboard) => dashboard.id === this.dashboardId()),
  );
  readonly isEditMode = signal(false);

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

  enterEditMode() {
    this.isEditMode.set(true);
    this.originalTabs = structuredClone(this.tabs());
  }

  exitEditMode() {
    this.isEditMode.set(false);
  }

  removeDashboard() {
    const dashboard = this.currentDashboard();
    if (!dashboard) return;

    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { title: `Delete ${dashboard.title} Dashboard`, message: 'Are you sure?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(DashboardActions.deleteDashboard({ dashboardId: dashboard.id }));
      }
    });
  }

  save() {
    const dashboardId = this.dashboardId();
    if (!dashboardId) return;
    this.store.dispatch(
      DashboardActions.saveDashboard({ dashboardId, data: { tabs: this.tabs() } }),
    );
    this.exitEditMode();
  }

  discard() {
    this.store.dispatch(DashboardActions.restoreTabs({ tabs: this.originalTabs }));
    this.exitEditMode();
  }
}
