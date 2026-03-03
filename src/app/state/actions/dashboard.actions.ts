import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TDashboard } from '../../models/dashboard.model';
import { Tab } from '../../models/tab.model';

export const DashboardActions = createActionGroup({
  source: 'Dashboard',
  events: {
    'Load Dashboard': props<{ dashboardId: string }>(),
    'Create Dashboard': props<{ dashboard: TDashboard }>(),
    'Delete Dashboard': props<{ dashboardId: string }>(),
    'Save Dashboard': props<{ dashboardId: string; data: { tabs: Tab[] } }>(),
    'Restore Tabs': props<{ tabs: Tab[] }>(),
    'Reorder Tab': props<{ tabId: string; direction: 'left' | 'right' }>(),
    'Add Tab': props<{ title: string }>(),
    'Edit Tab': props<{ originalTitle: string; newTitle: string }>(),
    'Remove Tab': props<{ tabId: string }>(),
  },
});

export const DashboardApiActions = createActionGroup({
  source: 'Dashboard API',
  events: {
    'Dashboard Loaded Success': props<{ tabs: Tab[]; dashboardId: string }>(),
    'Dashboard Loaded Error': props<{ error: Error }>(),
    'Dashboard Created Success': props<{ dashboard: TDashboard }>(),
    'Dashboard Created Error': props<{ error: Error }>(),
    'Dashboard Deleted Success': props<{ dashboardId: string }>(),
    'Dashboard Deleted Error': props<{ error: Error }>(),
    'Dashboard Saved Success': props<{ tabs: Tab[] }>(),
    'Dashboard Saved Error': props<{ error: Error }>(),
  },
});
