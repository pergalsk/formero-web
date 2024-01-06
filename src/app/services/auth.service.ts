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

export type ForgotPasswordRequest = {
  email: string;
};

export type SimpleMessageResponse = {
  message: string;
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

  loginUser(data: LoginUserRequest): Observable<User> {
    return this.getCsrfCookie().pipe(
      concatMap(() => {
        return this.httpClient.post<User>('/login', data);
      }),
    );
  }

  logoutUser(): Observable<void | SimpleMessageResponse> {
    // todo: is it necessary to preload CSRF cookie here ?
    return this.getCsrfCookie().pipe(
      concatMap(() => {
        return this.httpClient.post<void | SimpleMessageResponse>('/logout', {});
      }),
    );
  }

  registerUser(data: RegisterUserRequest): Observable<User> {
    return this.getCsrfCookie().pipe(
      concatMap(() => {
        return this.httpClient.post<User>('/register', data);
      }),
    );
  }

  forgotPassword(data: ForgotPasswordRequest): Observable<any> {
    return this.getCsrfCookie().pipe(
      concatMap(() => {
        return this.httpClient.post('/forgot-password', data);
      }),
    );
  }

  ensureCsrfCookie<T>(observable: Observable<T>): Observable<T> {
    return this.getCsrfCookie().pipe(concatMap(() => observable));
  }
}
