import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from '../reducers/dashboard.reducer';

export const selectDashboard = createFeatureSelector<DashboardState>('dashboard');

export const selectTabs = createSelector(selectDashboard, (state) => state.tabs);
export const selectLoading = createSelector(selectDashboard, (state) => state.loading);
