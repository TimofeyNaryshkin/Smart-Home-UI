import { inject, Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { shareReplay, startWith, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardList {
  private readonly apiService = inject(ApiService);
  private readonly subject$ = new Subject<void>();

  readonly dashboards$ = this.subject$.pipe(
    startWith(null),
    switchMap(() => this.apiService.getDashboards()),
    shareReplay(1),
  );

  refresh() {
    this.subject$.next()
  }
}
