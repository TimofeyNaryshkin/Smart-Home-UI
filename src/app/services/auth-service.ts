import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenSubject = new BehaviorSubject(this.getStoredToken());

  private getStoredToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  getToken() {
    return this.tokenSubject.value;
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
    this.tokenSubject.next(token);
  }

  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
    this.tokenSubject.next(null);
  }

  isAuth() {
    return !!this.getToken();
  }
}
