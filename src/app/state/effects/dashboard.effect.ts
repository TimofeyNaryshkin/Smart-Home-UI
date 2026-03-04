import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, first, map, mergeMap, of, skip, switchMap, tap } from 'rxjs';
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

  deleteDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.deleteDashboard),
      switchMap(({ dashboardId }) =>
        this.apiService.deleteDashboard(dashboardId).pipe(
          map(() => DashboardApiActions.dashboardDeletedSuccess({ dashboardId })),
          catchError((error: Error) => of(DashboardApiActions.dashboardDeletedError({ error }))),
        ),
      ),
    ),
  );

  afterDashboardDeleted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DashboardApiActions.dashboardDeletedSuccess),
        switchMap(() => {
          this.dashboardListService.refresh();
          return this.dashboardListService.dashboards$.pipe(skip(1), first());
        }),
        tap((dashboards) => {
          if (dashboards.length) {
            this.router.navigate(['/dashboard', dashboards[0].id]);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }),
      ),
    { dispatch: false },
  );

  saveDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.saveDashboard),
      exhaustMap(({ dashboardId, data }) =>
        this.apiService.saveDashboard(dashboardId, data).pipe(
          map(() => DashboardApiActions.dashboardSavedSuccess({ tabs: data.tabs })),
          catchError((error: Error) => of(DashboardApiActions.dashboardSavedError({ error }))),
        ),
      ),
    ),
  );

  toggleDevice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.toggleDeviceState, ),
      mergeMap(({ tabId, cardId, deviceId, newState }) =>
        this.apiService.toggleDevice(deviceId, { state: newState }).pipe(
          map((device) => DashboardApiActions.deviceToggledSuccess({ device })),
          catchError(() => of(DashboardActions.revertDeviceState({ tabId, cardId, deviceId, newState: !newState }))),
        ),
      ),
    ),
  );
}
