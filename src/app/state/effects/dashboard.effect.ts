import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, switchMap, tap } from 'rxjs';
import { ApiService } from '../../services/api-service';
import { DashboardActions, DashboardApiActions } from '../actions/dashboard.actions';
import { Router } from '@angular/router';
import { DashboardList } from '../../services/dashboard-list-service';

@Injectable()
export class DashboardEffect {
  private readonly actions$ = inject(Actions);
  private readonly apiService = inject(ApiService);
  private readonly dashboardListService = inject(DashboardList);
  private readonly router = inject(Router);

  loadDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadDashboard),
      switchMap(({ dashboardId }) =>
        this.apiService.getDashboard(dashboardId).pipe(
          map(({ tabs }) => DashboardApiActions.dashboardLoadedSuccess({ tabs, dashboardId })),
          catchError((error: Error) => of(DashboardApiActions.dashboardLoadedError({ error }))),
        ),
      ),
    ),
  );

  navigateToFirstTab$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DashboardApiActions.dashboardLoadedSuccess),
        tap(({ tabs, dashboardId }) => {
          const segments = this.router.url.split('/').filter(Boolean);
          const hasTab = segments.length >= 3;
          if (!hasTab && tabs.length > 0) {
            this.router.navigate(['/dashboard', dashboardId, tabs[0].id]);
          }
        }),
      ),
    { dispatch: false },
  );

  createDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.createDashboard),
      concatMap(({ dashboard }) =>
        this.apiService.createDashboard(dashboard).pipe(
          map((dashboard) => DashboardApiActions.dashboardCreatedSuccess({ dashboard })),
          catchError((error: Error) => of(DashboardApiActions.dashboardCreatedError({ error }))),
        ),
      ),
    ),
  );

  navigateToCreatedDashboard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DashboardApiActions.dashboardCreatedSuccess),
        tap(({ dashboard }) => {
          this.dashboardListService.refresh();
          this.router.navigate([`/dashboard/${dashboard.id}`]);
        }),
      ),
    { dispatch: false },
  );
}
