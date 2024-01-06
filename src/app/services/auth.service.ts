import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap, Observable } from 'rxjs';

export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
};

export type RegisterUserRequest = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
  remember: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient: HttpClient = inject(HttpClient);

  getCsrfCookie(): Observable<void> {
    return this.httpClient.get<void>('/sanctum/csrf-cookie');
  }

  getUser(): Observable<User> {
    return this.httpClient.get<User>('/api/user');
  }

  registerUser(data: RegisterUserRequest): Observable<any> {
    return this.getCsrfCookie().pipe(
      concatMap(() => {
        return this.httpClient.post('/register', data);
      }),
    );
  }

  loginUser(data: LoginUserRequest): Observable<any> {
    return this.getCsrfCookie().pipe(
      concatMap(() => {
        return this.httpClient.post('/login', data);
      }),
    );
  }

  logoutUser(): Observable<any> {
    // todo: is it necessary to preload CSRF cookie here ?
    return this.getCsrfCookie().pipe(
      concatMap(() => {
        return this.httpClient.post('/logout', {});
      }),
    );
  }
}
