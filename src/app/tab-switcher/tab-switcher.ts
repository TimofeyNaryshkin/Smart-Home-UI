import { Component, computed, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, filter, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { DashboardActions } from '../state/actions/dashboard.actions';
import { selectTabs } from '../state/selectors/dashboard.selectors';
import { DashboardList } from '../services/dashboard-list-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { Tab } from '../models/tab.model';
import { EditTabDialog } from '../edit-tab-dialog/edit-tab-dialog';
import { EditMode } from '../services/edit-mode-service';

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
  readonly editModeService = inject(EditMode);
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

  constructor() {
    this.route.params
      .pipe(
        map((p) => p['dashboardId']),
        filter(Boolean),
        distinctUntilChanged(),
        tap((dashboardId) => {
          this.editModeService.exit();
          this.store.dispatch(DashboardActions.loadDashboard({ dashboardId }));
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  enterEditMode() {
    this.editModeService.enter();
    this.originalTabs = structuredClone(this.tabs());
  }

  exitEditMode() {
    this.editModeService.exit();
  }

  removeDashboard() {
    const dashboard = this.currentDashboard();
    if (!dashboard) return;

    const dialogReference = this.dialog.open(ConfirmDialog, {
      data: { title: `Delete ${dashboard.title} Dashboard`, message: 'Are you sure?' },
    });
    dialogReference.afterClosed().subscribe((result) => {
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

  reorder(tabId: string, direction: 'left' | 'right') {
    this.store.dispatch(DashboardActions.reorderTab({ tabId, direction }));
  }

  add() {
    const dialogReference = this.dialog.open(EditTabDialog, {
      data: { message: `Please enter new tab title`, tabsSignal: this.tabs },
    });
    dialogReference.afterClosed().subscribe((title) => {
      if (title) {
        this.store.dispatch(DashboardActions.addTab({ title }));
      }
    });
  }

  edit(originalTitle: string) {
    const dialogReference = this.dialog.open(EditTabDialog, {
      data: { message: `Please enter new tab title`, tabsSignal: this.tabs, title: originalTitle },
    });
    dialogReference.afterClosed().subscribe((newTitle) => {
      if (newTitle) {
        this.store.dispatch(DashboardActions.editTab({ originalTitle, newTitle }));
      }
    });
  }

  remove(tabId: string) {
    this.store.dispatch(DashboardActions.removeTab({ tabId }));
  }
}
