import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TDashboard } from '../../models/dashboard.model';
import { Tab } from '../../models/tab.model';

export const DashboardActions = createActionGroup({
  source: 'Dashboard',
  events: {
    'Load Dashboard': props<{ dashboardId: string }>(),
    'Create Dashboard': props<{ dashboard: TDashboard }>(),
  },
});

export const DashboardApiActions = createActionGroup({
  source: 'Dashboard API',
  events: {
    'Dashboard Loaded Success': props<{ tabs: Tab[]; dashboardId: string }>(),
    'Dashboard Loaded Error': props<{ error: Error }>(),
  },
});
