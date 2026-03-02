import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Credentials } from '../models/login.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { TDashboard } from '../models/dashboard.model';
import { Tab } from '../models/tab.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);

  login(credentials: Credentials): Observable<{ token: 'string' }> {
    return this.http.post<{ token: 'string' }>('/user/login', credentials);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>('/user/profile');
  }

  getDashboards(): Observable<TDashboard[]> {
    return this.http.get<TDashboard[]>('/dashboards');
  }

  getDashboard(dashboardId: string): Observable<{ tabs: Tab[] }> {
    return this.http.get<{ tabs: Tab[] }>(`/dashboards/${dashboardId}`);
  }

  createDashboard(data: TDashboard): Observable<TDashboard> {
    return this.http.post<TDashboard>(`/dashboards`, data);
  }

  deleteDashboard(dashboardId: string) {
    return this.http.delete(`/dashboards/${dashboardId}`);
  }

  saveDashboard(dashboardId: string, data: { tabs: Tab[] }) {
    return this.http.put(`/dashboards/${dashboardId}`, data);
  }
}
