import { createReducer, on } from '@ngrx/store';
import { DashboardActions, DashboardApiActions } from '../actions/dashboard.actions';
import { Tab } from '../../models/tab.model';

export interface DashboardState {
  tabs: Tab[];
  loading: boolean;
  error: Error | null;
}

const initialState: DashboardState = {
  tabs: [],
  loading: false,
  error: null,
};

export const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadDashboard, (state) => ({
    ...state,
    tabs: [],
    loading: true,
    error: null,
  })),
  on(DashboardApiActions.dashboardLoadedSuccess, (state, { tabs }) => ({
    ...state,
    tabs,
    loading: false,
  })),
  on(DashboardApiActions.dashboardLoadedError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(DashboardApiActions.dashboardSavedSuccess, (state, { tabs }) => ({
    ...state,
    tabs,
  })),
  on(DashboardActions.restoreTabs, (state, { tabs }) => ({
    ...state,
    tabs,
  })),
);
