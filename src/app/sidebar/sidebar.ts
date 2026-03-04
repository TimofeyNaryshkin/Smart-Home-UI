import { Component, computed, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api-service';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith, take, tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { AddDashboardForm } from '../add-dashboard-form/add-dashboard-form';
import { DashboardList } from '../services/dashboard-list-service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, MatIconModule, MatDividerModule, MatButtonModule, MatListModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly router = inject(Router);
  private readonly apiService = inject(ApiService);
  private readonly dashboardListService = inject(DashboardList);
  private readonly dialog = inject(MatDialog);

  readonly user = toSignal(this.apiService.getProfile());
  readonly list = toSignal(this.dashboardListService.dashboards$);

  constructor() {
    toObservable(this.list)
      .pipe(
        filter((dashboards) => !!dashboards?.length),
        take(1),
        tap((dashboards) => {
          if (!this.router.url.includes('/dashboard/')) {
            this.router.navigate(['/dashboard', dashboards?.[0].id]);
          }
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((end) => end instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
  );

  readonly currentDashboardId = computed(
    () => this.currentUrl()?.match(/\/dashboard\/([^/?]+)/)?.[1],
  );

  openDashboardForm() {
    this.dialog.open(AddDashboardForm);
  }
}
