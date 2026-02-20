import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api-service';
import { Tab } from '../models/tab.model';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardStore {
  private readonly apiService = inject(ApiService);
  readonly tabs = signal<Tab[]>([]);

  loadDashboard(dashboardId: string): Observable<Tab[]> {
    this.tabs.set([]);
    return this.apiService.getDashboard(dashboardId).pipe(
      map((respons) => respons.tabs),
      tap((tabs) => this.tabs.set(tabs)),
    );
  }

  getTab(tabId: string): Tab | undefined {
    return this.tabs().find((t) => t.id === tabId);
  }
}
